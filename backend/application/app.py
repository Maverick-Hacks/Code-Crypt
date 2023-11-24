# import hashlib
# import datetime
# from flask import Flask, request, jsonify
# from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
# from pymongo import MongoClient
# from bson.objectid import ObjectId# Import ObjectId for handling MongoDB object IDs

# app = Flask(__name__)
# jwt = JWTManager(app)
# app.config['JWT_SECRET_KEY'] = 'Your_Secret_Key'
# app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=1)

# # mongodb+srv://prabathkini:Prabath2023*@cluster0.6rrsjkx.mongodb.net/
# client = MongoClient("mongodb+srv://prabath:jNqyuWbkBgzkCMDo@cluster0.21vdk1e.mongodb.net/") # your connection string
# db = client["mydb"]
# users_collection = db["users"]
# products_collection = db["products"]

# @app.route("/api/v1/users", methods=["POST"])
# def register():
# 	new_user = request.get_json() # store the json body request
# 	new_user["password"] = hashlib.sha256(new_user["password"].encode("utf-8")).hexdigest() # encrpt password
# 	doc = users_collection.find_one({"username": new_user["username"]}) # check if user exist
# 	if not doc:
# 		users_collection.insert_one(new_user)
# 		return jsonify({'msg': 'User created successfully'}), 201
# 	else:
# 		return jsonify({'msg': 'Username already exists'}), 409

# @app.route("/api/v1/products", methods=["POST"])
# def login():
# 	login_details = request.get_json() # store the json body request
# 	user_from_db = users_collection.find_one({'username': login_details['username']})  # search for user in database

# 	if user_from_db:
# 		encrpted_password = hashlib.sha256(login_details['password'].encode("utf-8")).hexdigest()
# 		if encrpted_password == user_from_db['password']:
# 			access_token = create_access_token(identity=user_from_db['username']) # create jwt token
# 			return jsonify(access_token=access_token), 200

# 	return jsonify({'msg': 'The username or password is incorrect'}), 401

# @app.route("/api/v1/user", methods=["GET"])
# @jwt_required
# def profile():
# 	current_user = get_jwt_identity() # Get the identity of the current user
# 	user_from_db = users_collection.find_one({'username' : current_user})
# 	if user_from_db:
# 		del user_from_db['_id'], user_from_db['password'] # delete data we don't want to return
# 		return jsonify({'profile' : user_from_db }), 200
# 	else:
# 		return jsonify({'msg': 'Profile not found'}), 404



# # Assuming 'products_collection' refers to your MongoDB collection

# @app.route("/api/v1/products", methods=["POST"])
# @jwt_required
# def create_product():
#     new_product = request.get_json()
#     new_id=ObjectId()

#     # Example structure of a product document
#     # This structure should match your actual product schema
#     product_data = {
#         "_id": new_id,
#         "name": new_product.get("name"),
#         "price": new_product.get("price"),
#         "description": new_product.get("description"),
#         # Add more fields as per your product schema
#     }

#     # Insert the product into the 'products_collection'
#     inserted_product = products_collection.insert_one(product_data)

#     # Check if the product was successfully inserted
#     if inserted_product.inserted_id:
#         return jsonify({'msg': 'Product created successfully'}), 201
#     else:
#         return jsonify({'msg': 'Failed to create product'}), 500  # 500 for Internal Server Error


# if __name__ == '__main__':
# 	app.run(debug=True)


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

    # Update only the fields that are provided in the request
    update_fields = {}

    if 'new_name' in data:
        update_fields['name'] = data['new_name']
    if 'price' in data:
        update_fields['price'] = data['price']
    if 'description' in data:
        update_fields['description'] = data['description']

    # Perform the update operation
    products_collection.update_one(
        {'name': data['name']},
        {'$set': update_fields}
    )

    return jsonify({'message': 'Product updated successfully'}), 200


    
   
if __name__ == "__main__":
    app.run(debug=True)