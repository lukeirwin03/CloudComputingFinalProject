from flask import Flask, jsonify, request
import boto3
from botocore.exceptions import ClientError

app = Flask(__name__)
dynamodb = boto3.resource('dynamodb')

users_table = dynamodb.Table('Users')
posts_table = dynamodb.Table('Posts')

# Endpoint to register a user
@app.route('/register', methods=['POST'])
def register_user():
    data = request.json  # extracts the data from the incoming request
    try:
        users_table.put_item(Item=data)
        return jsonify({'message': 'User registered successfully!'}), 201  # return a success message and success code
    except ClientError as e:
        return jsonify({'error': str(e)}), 500  # return an error and error code
    
# Endpoint to create a new post
@app.route('/post', methods=['POST'])
def create_post():
    data = request.json
    try:
        posts_table.put_item(Item=data)
        return jsonify({'message': 'Post created successfully!'}), 201  # return a success message and success code
    except ClientError as e:
        return jsonify({'error': str(e)}), 500  # return an error and error code
    
# Endpoint to get all posts
@app.route('/posts', methods=['GET'])
def get_posts():
    try:
        response = posts_table.scan()
        return jsonify(response.get('Items', [])), 200  # Fixed syntax issue here
    except ClientError as e:
        return jsonify({'error': str(e)}), 500  # return an error and error code

if __name__ == '__main__':
    app.run(debug=True)
