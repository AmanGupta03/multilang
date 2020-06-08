#!/bin/bash

###########################
# Docker SETUP
###########################

#set-up repository
sudo apt-get update

sudo apt-get install -y \
  apt-transport-https \
  ca-certificates \
  curl \
  gnupg-agent \
  software-properties-common 
  
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo apt-key fingerprint 0EBFCD88

sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

sudo apt-get update

#install docker ingine
sudo apt-get install -y docker-ce docker-ce-cli containerd.io
echo "Docker Setup complete"

###########################
# NodeJS setup
###########################
sudo apt-get install -y nodejs
sudo apt-get install -y npm
echo "NodeJS setup Complete"

###########################
#Install dependencies
###########################
sudo docker build .  #pull docker images for php, python, node
sudo npm i  #install dependencies from package.json

echo "Successfully install project dependencies"
echo "Setup Completed"