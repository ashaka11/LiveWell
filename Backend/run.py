from app import create_app
from flask_cors import CORS

# Load environment variables from .env file

# Create the Flask app
app = create_app('../config.py')

if __name__ == "__main__":
    # Run the Flask app
    app.run(host="0.0.0.0", port=5000, debug=app.config["DEBUG"])