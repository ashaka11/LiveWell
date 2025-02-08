from flask import Blueprint, request, jsonify, current_app, make_response
import bcrypt, jwt
from ..Models.user import User

login = Blueprint('login', __name__)

@login.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        data = request.get_json()
        data['password'] = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
        return User().add_user(data)
    

@login.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        user = User().get_user(data['username'])
        if user:
            if bcrypt.checkpw(data['password'].encode('utf-8'), user['password']):
                token = jwt.encode({'username': user['username']}, current_app.config['SECRET_KEY'])
                return make_response(jsonify({'token': token.decode('utf-8')}), 200)
            else:
                return make_response(jsonify({'message': 'Invalid password'}), 401)
        return make_response(jsonify({'message': 'Invalid username'}), 401)
