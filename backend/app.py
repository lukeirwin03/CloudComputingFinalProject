from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import boto3
from botocore.exceptions import ClientError
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Initialize FastAPI app
app = FastAPI()

# Set up DynamoDB
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
users_table = dynamodb.Table('Users')
posts_table = dynamodb.Table('Posts')

# Data models for request bodies
class User(BaseModel):
    userId: str
class Post(BaseModel):
    postId: str
    content: str

# Endpoint to register a user
@app.post("/register")
async def register_user(user: User):
    try:
        users_table.put_item(Item=user.dict())
        return {"message": "User registered successfully!"}
    except ClientError as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint to create a new post
@app.post("/post")
async def create_post(post: Post):
    try:
        posts_table.put_item(Item=post.dict())
        return {"message": "Post created successfully!"}
    except ClientError as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint to get all posts
@app.get("/posts", response_model=List[Post])
async def get_posts():
    try:
        response = posts_table.scan()
        posts = response.get('Items', [])
        if not posts:
            print("No posts found in the database.")
        return posts
    except ClientError as e:
        print(f"Error fetching posts: {e}")
        raise HTTPException(status_code=500, detail="Error fetching posts from DynamoDB.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=5000)
    # for EC2
    # uvicorn.run(app, host="0.0.0.0", port=5000)
