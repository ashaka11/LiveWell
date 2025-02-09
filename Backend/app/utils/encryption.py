from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import base64
import os

def encrypt_data(text: str, key: str) -> str:
    if len(key) not in [16, 24, 32]:
        raise ValueError("Key must be 16, 24, or 32 bytes long.")
    
    # Generate a random IV
    iv = os.urandom(16)
    
    # Create AES cipher
    cipher = AES.new(key, AES.MODE_CBC, iv)
    
    # Pad and encrypt the data
    padded_data = pad(text.encode('utf-8'), AES.block_size)
    encrypted = cipher.encrypt(padded_data)
    
    # Combine IV and encrypted data, then base64 encode
    return base64.b64encode(iv + encrypted).decode('utf-8')

def decrypt_data(encrypted_text: str, key: str) -> str:
    # Ensure key is the correct length
    if len(key) not in [16, 24, 32]:
        raise ValueError("Key must be 16, 24, or 32 bytes long.")
    
    # Decode base64
    encrypted_data = base64.b64decode(encrypted_text)
    
    # Extract IV (first 16 bytes)
    iv = encrypted_data[:16]
    
    # Extract encrypted data (remaining bytes)
    encrypted = encrypted_data[16:]
    
    # Create AES cipher
    cipher = AES.new(key, AES.MODE_CBC, iv)
    
    # Decrypt and unpad
    decrypted = cipher.decrypt(encrypted)
    return unpad(decrypted, AES.block_size).decode('utf-8')