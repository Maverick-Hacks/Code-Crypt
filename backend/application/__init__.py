from flask import Flask, request, jsonify
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash


app = Flask(__name__)


client = MongoClient("mongodb+srv://prabath:jNqyuWbkBgzkCMDo@cluster0.21vdk1e.mongodb.net/")
db = client["mydb"]
users_collection = db["users"]
products_collection = db["products"]


@app.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    if 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Username and password are required'}), 400
    existing_user = users_collection.find_one({'username': data['username']})
    if existing_user:
        return jsonify({'error': 'Username already exists'}), 400
    new_user = {
        'username': data['username'],
        'password': data['password']
    }


    users_collection.insert_one(new_user)


    return jsonify({'message': 'User registered successfully'}), 201




@app.route('/createProduct', methods=['POST'])
def create_product():
    data = request.get_json()
    if 'name' not in data or 'description' not in data or 'price' not in data:
        return jsonify({'error': 'Name, description and price are required'}), 400
    existing_product = products_collection.find_one({'name': data['name']})
    if existing_product:
        return jsonify({'error': 'Product already exists'}), 400
    new_product = {
        'name': data['name'],
        'description': data['description'],
        'price': data['price']
    }


    products_collection.insert_one(new_product)


    return jsonify({'message': 'Product added successfully'}), 201  


if __name__ == "__main__":
    app.run(debug=True)