from datetime import datetime
from openai import OpenAI
from ..models.symptom import Symptoms
from ..utils.encryption import encrypt_data
from flask import current_app
import re, json

class SymptomService:
    # Define the prompt
    system_prompt = """
You are a medical assistant. When a user describes their symptom, your response should include only:

Please follow the following template while generating a concise and accurate response:

{
    "diagnosis": "<diagnosis>",
    "dietary_recommendations": "<dietary_recommendations>",
    "follow_up_questions": "<follow_up_questions>",
    "summary": "<summary>"
}

where:
- "diagnosis" is a brief overview of potential conditions related to the symptoms. Explain this briefly. 
  If the symptoms appear severe or life-threatening (e.g., chest pain, difficulty breathing, loss of consciousness), 
  explicitly recommend seeking immediate medical attention from a healthcare professional.
- "dietary_recommendations" is specific dietary adjustments or foods to alleviate symptoms.
- "follow_up_questions" is a list of questions to gather more information (if needed).
- "summary" is a concise summary of the user's symptoms and your response.
"""

        # "Example response format:\n"
        # '''{
        #     "diagnosis": "...",
        #     "dietary_recommendations": "...",
        #     "follow_up_questions": ["...", "..."],
        #     "needs_more_info": true/false,
        #     "summary": "..."
        # }\n\n'''
        
        # "Important:\n"
        # "- Respond ONLY in valid JSON format.\n"
        # "- Do NOT use markdown or code blocks.\n"
        # "- Use double quotes for strings and keys.\n"
        # "- Tailor advice to the user's symptoms."
    


    # @staticmethod
    def process_symptoms(user: str, symptoms: str):
        results = SymptomService._get_gpt4_diagnosis(symptoms)
        with current_app.app_context():
            key = current_app.config['SECRET_KEY']
        
        print(results['summary'])
        encrypted_symptoms = encrypt_data(symptoms, key)
        encrypted_diagnosis = encrypt_data(results['summary'], key)

        Symptoms().add_symptom(user, encrypted_symptoms, encrypted_diagnosis, datetime.now())

        return results
    
    def _get_gpt4_diagnosis(symptoms: str):
        with current_app.app_context():
            openai = OpenAI(api_key=current_app.config['OPENAI_KEY'])
            
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": SymptomService.system_prompt},
                {"role": "user", "content": symptoms},
            ],
            max_tokens=1000
        )
        result = response.choices[0].message.content
        data = json.loads(result)
        return data