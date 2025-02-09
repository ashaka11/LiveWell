from pymongo import MongoClient
from flask import current_app, make_response, jsonify

class User:
    def __init__(self):
        self.client = MongoClient(current_app.config['MONGO_URI'])
        self.db = self.client['LiveWell']
        self.collection = self.db['users']

    def get_user(self, username):
        user = self.collection.find_one({'username': username})
        return user
    
    def add_user(self, data):
        if self.collection.find_one({'username': data['username']}):
            return make_response(jsonify({'message': 'User already exists'}), 400)
        self.collection.insert_one(data)
        return make_response(jsonify({'message': 'User added'}), 200)