from flask import Flask
from flask_cors import CORS
from app.routes.login import login
from app.routes.symptoms import symptoms_bp
from flask import jsonify

def create_app(config):
    app = Flask(__name__)
    CORS(app, supports_credentials=True)
    app.config.from_pyfile(config)
    app.register_blueprint(login, url_prefix='/user')
    app.register_blueprint(symptoms_bp)
    print(app.config['SECRET_KEY'])

    # Error handling
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'message': 'Resource not found'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'message': 'Internal server error'}), 500
    
    @app.errorhandler(401)
    def unauthorized(error):
        return jsonify({'message': 'Unauthorized'}), 401

    return app
