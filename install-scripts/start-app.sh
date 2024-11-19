#!/bin/bash

# Navigate to project root and source global environment variables
cd /home/ec2-user/final_project
source ./set-env

# Set up and start the backend
cd /home/ec2-user/final_project/backend
pip3 install -r requirements.txt || { echo "Backend dependencies failed to install"; exit 1; }
source .env
python3 app.py > /home/ec2-user/backend.log 2>&1 &

# Set up and start the frontend
cd /home/ec2-user/final_project/uno-forum
npm install || { echo "Frontend dependencies failed to install"; exit 1; }
source .env
npm start > /home/ec2-user/frontend.log 2>&1 &
