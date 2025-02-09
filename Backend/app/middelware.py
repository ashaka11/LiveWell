from flask import current_app, request, jsonify
from functools import wraps
import jwt
from .models.user import User

# Token verification middleware
def token_required(f):
    @wraps(f)
    def validate(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            user = User().get_user(data['username'])
            if not user:
                return jsonify({'message': 'Invalid token'}), 401
        except:
            return jsonify({'message': 'Invalid token'}), 401
        return f(user, *args, **kwargs)
    return validate