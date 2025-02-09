from pymongo import MongoClient
from flask import current_app, make_response, jsonify
from ..utils.encryption import decrypt_data

class Symptoms:
    def __init__(self):
        self.client = MongoClient(current_app.config['MONGO_URI'])
        self.db = self.client['LiveWell']
        self.collection = self.db['symptoms']

    def add_symptom(self, user, symptom, diagnosis, time):
        self.collection.insert_one({
            "user_id": user,
            "symptom": symptom,
            "diagnosis": diagnosis,
            "time": time
        })
    
    def get_symptom_record(self, user):
        symptoms = self.collection.find({"user_id": user})
        symptom_list = []
        with current_app.app_context():
            key = current_app.config['SECRET_KEY']

        for symptom in symptoms:
            print(str(symptom["_id"]))
            symptom["_id"] = str(symptom["_id"])  # Convert ObjectId to string
            if "symptom" in symptom:
                symptom["symptom"] = decrypt_data(symptom["symptom"], key)
            if "diagnosis" in symptom:
                symptom["diagnosis"] = decrypt_data(symptom["diagnosis"], key)
            symptom_list.append([symptom["symptom"], symptom["diagnosis"], symptom["time"]])

        return symptom_list if symptom_list else None