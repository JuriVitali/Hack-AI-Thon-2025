from flask import Flask, flash, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
import os

app = Flask(__name__)
CORS(app) # disabilita errore e rende possibili le richieste tra backend e frontend

# UPLOAD_FOLDER = 'backend/uploads' 
UPLOAD_FOLDER = os.path.join(app.root_path, 'uploads')

ALLOWED_EXTENSIONS = {'pdf'}

def allowed_file(filename):  # ritorna vero se c'è il punto nel nome e se l'estensione è tra quelle consentite, falso altrimenti
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER 

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://ai:ai@localhost:5532/ai"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

migrate = Migrate(app, db)



