#!/bin/bash

# Grab the public ip
IP=$(curl -s ifconfig.me)

# check if the IP was successfully retrieved
if [ -z "$IP" ]; then
  echo "Unable to retrieve IP address."
  exit 1
fi

FORMATTED_IP=$IP
# # format it for AWS
# FORMATTED_IP=$(echo "$IP" | sed 's/\./-/g')

# write the formatted IP to the .env file
echo "AWS_URL=http://ec2-$FORMATTED_IP.compute-1.amazonaws.com:3000" > backend/.env
echo "REACT_APP_AWS_URL=http://ec2-$FORMATTED_IP.compute-1.amazonaws.com:5000" > uno-forum/.env
