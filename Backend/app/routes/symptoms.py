from flask import Blueprint, request, jsonify, current_app, make_response
from ..services.symptom_service import SymptomService
from ..middelware import token_required
from ..models.symptom import Symptoms

symptoms_bp = Blueprint('symptoms', __name__)

@symptoms_bp.route('/symptoms', methods=['POST'])
# @token_required
def add_symptoms():
    data = request.get_json()
    username = "abc@gmail.com"
    symptoms = data['symptoms']
    diagnosis = SymptomService.process_symptoms(username, symptoms)
    print(diagnosis)
    # return make_response(jsonify({"symptom_id": str(symptom_id), "diagnosis": diagnosis}), 200)
    return make_response(jsonify({'symptom':diagnosis}),200)

# routes/symptoms.py
@symptoms_bp.route('/medical-history', methods=['GET'])
# @token_required
def get_medical_history():
    user_id = "abc@gmail.com"
    entries = Symptoms().get_symptom_record(user_id)
    
    return jsonify(entries), 200