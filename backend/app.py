from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from pymongo import MongoClient
import string
import random
from bson.objectid import ObjectId
import config

app = Flask(__name__)
app.secret_key = 's3cr3t_k3y'

client = MongoClient(config.uri)
db = client["user_db"]
user_collection = db['user']
questions_collection = db['questions']

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        usn = request.form.get('usn')
        password = request.form.get('password')

        user = user_collection.find_one({'usn': usn})

        if user and user['password'] == password:
            flash("Login successful!", "success")
            return redirect(url_for('home'))
        else:
            flash("Invalid email or password.", "error")
            return redirect(url_for('login'))

    return render_template('login.html')

@app.route('/home')
def home():
    return render_template('index.html')

@app.route('/questions', methods=['GET', 'POST'])
def questions():
    if request.method == 'POST':
        question = request.form['question']

        if question:
            questions_collection.insert_one({'question': question})
            flash("Your question has been added successfully!", "success")
        else:
            flash("Please enter a valid question.", "error")

        return redirect(url_for('questions'))
    
    questions_list = questions_collection.find()
    return render_template('questions.html', questions=questions_list)

@app.route('/notes')
def notes():
    return render_template('notes.html')

@app.route('/settings')
def settings():
    return render_template('settings.html')

@app.route('/profile')
def profile():
    return render_template('profile.html')

@app.route('/replies/<question_id>')
def fetch_replies(question_id):
    question = questions_collection.find_one({'_id': ObjectId(question_id)})
    replies = question.get('replies', [])
    return jsonify({'replies': replies})

@app.route('/reply', methods=['POST'])
def add_reply():
    question_id = request.form['question_id']
    reply = request.form['reply']

    questions_collection.update_one(
        {'_id': ObjectId(question_id)},
        {'$push': {'replies': reply}}
    )

    flash("Reply added successfully!", "success")
    return redirect('/questions')

    
@app.route('/signup', methods=['POST', 'GET'])
def signup():
    if request.method == 'POST':
        data = request.get_json()

        usn = data.get('usn')
        email = data.get('email')
        name = data.get('name')
        branch = data.get('branch')
        
        password = ""
        
        
        characterList = (
            "abcdefghijklmnopqrstuvwxyz"  
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ"  
            "0123456789"                
            "_-"   
        )

        for _ in range(10):
            password += random.choice(characterList)

        if user_collection.find_one({'email': email}):
            return {"error": "Email already exists, please log in"}, 400

        if not all([usn, email, password,name,branch]):
            return {"error": "All fields are required"}, 400

        user_data = {
            'usn': usn,
            'email': email,
            'password': password,
            "name":name,
            "branch":branch
        }
        user_collection.insert_one(user_data)

        return {"message": "Sign Up successful"}, 201

    return {"message": "GET method not supported for signup"}, 405



if __name__ == '__main__':
    app.run(debug = True)