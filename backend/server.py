import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from pymongo import MongoClient

from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory

load_dotenv()

client = OpenAI()

app = Flask(__name__)


client = MongoClient("mongodb+srv://prabath:jNqyuWbkBgzkCMDo@cluster0.21vdk1e.mongodb.net/")
db = client["mydb"]
users_collection = db["users"]
products_collection = db["products"]

def ask(prompt):
    fashion_template = PromptTemplate(
    input_variables=['input'],
    template='suggest some fashion tips for {input}'
    )
    # fashion_memory = ConversationMemoryBufferMemory(input_key='input',memory_key='chat_history')
    llm = OpenAI(temperature=0.9)
    # fashion_suggestion = LLMChain(llm=llm, prompt=fashion_template, memory=fashion_memory, output_key='input' verbose=True)
    fashion_suggestion = LLMChain(llm=llm, prompt=fashion_template, verbose=True)
    return fashion_suggestion.run(prompt)

@app.route('/ask', methods=['GET'])
# {msg:'input'}
def get_bot_response():
    userText = request.args.get('msg')
    response = ask(userText)
    return response


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

@app.route('/products', methods=['GET'])
# /products GET
def get_products():
    products = list(db.products.find({}, {'_id': 0}))
    if products:
        return jsonify({'products': products})
    else:
        return jsonify({'message': 'No products found'}), 404

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

@app.route('/deleteProduct', methods=['POST'])
def delete_product():
    data = request.get_json()
    if 'name' not in data:
        return jsonify({'error': 'Name, description and price are required'}), 400
    criteria={'name': data['name']}
    result = db.products.delete_one(criteria)

    if result.deleted_count ==1:
        return jsonify({'msg': 'Product deleted successfully'}), 200
    else:
        return jsonify({'error': 'Failed to delete product'}), 500

@app.route('/product', methods=['GET'])
# /product {name}
def search_product():
    product_name = request.args.get('name')
    if not product_name:
        return jsonify({'error': 'Product name is required in the query parameters'}), 400
    query = {'name': {'$regex': f'.*{product_name}.*', '$options': 'i'}}
    matching_products = list(db.products.find(query, {'_id': 0}))
    if matching_products:
        return jsonify({'matching_products': matching_products}),
    else:
        return jsonify({'message': 'No matching products found'}), 404

@app.route('/updateProduct', methods=['PUT'])
def update_product():
    data = request.get_json()
    if 'name' not in data:
        return jsonify({'error': 'Product name is required for updating'}), 400

    existing_product = products_collection.find_one({'name': data['name']})
    if not existing_product:
        return jsonify({'error': 'Product not found'}), 404
    
    update_fields = {}

    if 'new_name' in data:
        update_fields['name'] = data['new_name']
    if 'price' in data:
        update_fields['price'] = data['price']
    if 'description' in data:
        update_fields['description'] = data['description']

    products_collection.update_one(
        {'name': data['name']},
        {'$set': update_fields}
    )

    return jsonify({'message': 'Product updated successfully'}), 200
   
if __name__ == "__main__":
    app.run(debug=True)