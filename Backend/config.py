import secrets

SECRET_KEY = secrets.token_hex(16)  # or manually define a secret key

MONGO_URI = 'mongodb+srv://atmehta:atmehta@livewell.coapq.mongodb.net/?retryWrites=true&w=majority&appName=LiveWell'