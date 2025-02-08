from flask import Flask
from flask_cors import CORS
from app.Login.login import login

def create_app(config):
    app = Flask(__name__)
    CORS(app)
    app.config.from_pyfile(config)
    app.register_blueprint(login)
    return app
