from flask import request, jsonify, render_template, flash, request, redirect, url_for, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from config import app, db, allowed_file
from werkzeug.utils import secure_filename
import os
from models import KnowBase

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename) # never trust user input
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('upload_file', name=filename))
    return render_template('index.html')

@app.route('/uploads/<name>')
def download_file(name):
    return send_from_directory(app.config["UPLOAD_FOLDER"], name)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    
    app.run(host='0.0.0.0', debug=True)

