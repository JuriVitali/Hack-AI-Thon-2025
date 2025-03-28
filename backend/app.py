from flask import request, jsonify, render_template, flash, request, redirect, url_for, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from config import app, db, allowed_file
from werkzeug.utils import secure_filename
import os
from models import KnowBase
import json
from service.chatbot import generate_quiz, question_answer
import requests

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'files' not in request.files:
            flash('No file part')
            return redirect(request.url)
        
        
        files = request.files.getlist("files") 
        
        # If the user does not select a file, the browser submits an empty file without a filename.
        
        if not files or all(file.filename == '' for file in files):
            flash('No selected file')
            return redirect(request.url)
        
        for file in files:
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename) # never trust user input
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                
                try: 
                    new_upload = KnowBase(path=os.path.join(app.config['UPLOAD_FOLDER'], filename))
                    db.session.add(new_upload)

                except Exception as e:
                    db.session.rollback()
                    flash(f'Error uploading file: {e}')
                    return redirect(request.url)
        
        db.session.commit()
        return redirect(url_for('upload_file', name=filename))
    
    

    # Query all entries from the KnowBase table
    files = KnowBase.query.all()
    return render_template('index.html', files=files)




@app.route('/uploads/<name>')
def download_file(name):
    return send_from_directory(app.config["UPLOAD_FOLDER"], name)




@app.route('/delete_file<id>', methods=['DELETE'])
def delete_file(id):

    KnowBase.query.filter(KnowBase.id == id).delete()

    db.session.commit()
    
    files = KnowBase.query.all()
    
    return render_template('index.html', files=files)

@app.route('/quiz', methods=['GET'])
def quiz():
    quiz = generate_quiz()
    return str(quiz)

@app.route('/chitchat', methods=['POST'])
def chitchat():
    if request.method == 'POST':
        text = request.form['text']
        response = question_answer(text)
        return str(response)
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    
    app.run(host='0.0.0.0', debug=True)

