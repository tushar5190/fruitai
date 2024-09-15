from flask import Flask, jsonify, request, abort
from flask_sqlalchemy import SQLAlchemy
from flask_httpauth import HTTPTokenAuth
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
import os
import jwt
import datetime

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for cross-origin requests
CORS(app)

# Configure SQLite Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///faqs.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key'  # Change this to a secure random key

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Initialize token-based authentication
auth = HTTPTokenAuth(scheme='Bearer')

# FAQ model for SQLAlchemy
class FAQ(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(200), nullable=False)
    answer = db.Column(db.String(500), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'question': self.question,
            'answer': self.answer
        }

# Hardcoded user credentials
users = {
    "admin": generate_password_hash("password")
}

# Token verification function
@auth.verify_token
def verify_token(token):
    try:
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        return data['username']
    except:
        return None

# Endpoint for login to get a JWT token
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    if not data or 'username' not in data or 'password' not in data:
        abort(400, description="Username and password are required")
    
    username = data['username']
    password = data['password']
    
    if username in users and check_password_hash(users.get(username), password):
        token = jwt.encode({
            'username': username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, app.config['SECRET_KEY'], algorithm="HS256")
        return jsonify({'token': token})
    return jsonify({'error': 'Invalid username or password'}), 401

# GET all FAQs
@app.route('/faqs', methods=['GET'])
def get_faqs():
    faqs = FAQ.query.all()
    return jsonify([faq.to_dict() for faq in faqs])

# GET a specific FAQ by ID
@app.route('/faqs/<int:faq_id>', methods=['GET'])
def get_faq(faq_id):
    faq = FAQ.query.get_or_404(faq_id)
    return jsonify(faq.to_dict())

# POST (create) a new FAQ (Requires authentication)
@app.route('/faqs', methods=['POST'])
@auth.login_required
def create_faq():
    data = request.json
    if not data or 'question' not in data or 'answer' not in data:
        abort(400, description="Question and answer are required")
    
    new_faq = FAQ(question=data['question'], answer=data['answer'])
    db.session.add(new_faq)
    db.session.commit()
    return jsonify(new_faq.to_dict()), 201

# PUT (update) an existing FAQ (Requires authentication)
@app.route('/faqs/<int:faq_id>', methods=['PUT'])
@auth.login_required
def update_faq(faq_id):
    faq = FAQ.query.get_or_404(faq_id)
    data = request.json
    if not data:
        abort(400, description="No update data provided")
    
    faq.question = data.get('question', faq.question)
    faq.answer = data.get('answer', faq.answer)
    db.session.commit()
    return jsonify(faq.to_dict())

# DELETE an FAQ (Requires authentication)
@app.route('/faqs/<int:faq_id>', methods=['DELETE'])
@auth.login_required
def delete_faq(faq_id):
    faq = FAQ.query.get_or_404(faq_id)
    db.session.delete(faq)
    db.session.commit()
    return jsonify({'result': True})

# Database initialization
if __name__ == '__main__':
    if not os.path.exists('faqs.db'):
        with app.app_context():
            db.create_all()
    app.run(debug=True)
