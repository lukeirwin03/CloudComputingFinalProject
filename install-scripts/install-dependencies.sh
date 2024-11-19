#!/bin/bash

# Set up and start the backend
cd /home/ec2-user/final_project/backend
pip3 install -r requirements.txt || { echo "Backend dependencies failed to install"; exit 1; }

# Set up and start the frontend
cd /home/ec2-user/final_project/uno-forum
npm install || { echo "Frontend dependencies failed to install"; exit 1; }
