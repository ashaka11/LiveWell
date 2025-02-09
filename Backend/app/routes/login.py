from flask import Blueprint, request, jsonify, current_app, make_response
import bcrypt, jwt

from ..models.user import User

login = Blueprint('user', __name__)

@login.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        data = request.get_json()
        data['password'] = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
        return User().add_user(data)
    

@login.route('/login', methods=['POST'])
def login_user():
    if request.method == 'POST':
        data = request.get_json()
        user = User().get_user(data['username'])
        if user:
            if bcrypt.checkpw(data['password'].encode('utf-8'), user['password']):
                print(user)
                token = jwt.encode({'username': user['username']}, current_app.config['SECRET_KEY'])
                return make_response(jsonify({'token': token}), 200)
            else:
                return make_response(jsonify({'message': 'Invalid password'}), 401)
        return make_response(jsonify({'message': 'Invalid username'}), 401)

@login.route('/validate', methods=['GET'])
def validate_token():
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'message': 'Missing or invalid token'}), 401
    
    token = auth_header.split(' ')[1]
    try:
        decoded = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        return jsonify({'valid': True, 'username': decoded['username']}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token'}), 401