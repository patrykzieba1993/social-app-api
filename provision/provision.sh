#!/usr/bin/env bash

machine_name="social-app-api.local"

IPADDR=$(/sbin/ifconfig eth0 | awk '/inet / { print $2 }' | sed 's/addr://')
sudo sed -i "s/^${IPADDR}.*//" /etc/hosts
   echo $IPADDR ${machine_name} | sudo tee -a /etc/hosts

# Set Locale and Timezone

echo LC_ALL="en_US.UTF-8" | sudo tee -a /etc/environment
echo "Europe/Oslo" | sudo tee /etc/timezone
sudo dpkg-reconfigure --frontend noninteractive tzdata

sudo apt-get update

# Install PostgreSQL

sudo apt-get install -y postgresql  postgresql-client
sudo cp /vagrant/provision/conf/pg_hba.conf /etc/postgresql/9.3/main/pg_hba.conf
sudo cp /vagrant/provision/conf/postgresql.conf /etc/postgresql/9.3/main/postgresql.conf

sudo -u postgres createuser --superuser dev
sudo -u postgres createuser api
sudo -u postgres createuser deploy
sudo -u postgres psql -U postgres -c "CREATE DATABASE social;"
sudo -u postgres psql -U postgres -d social -f /vagrant/provision/sql/setupDatabase.sql
sudo service postgresql restart

# Install NodeJS

sudo apt-get install -y nodejs npm
sudo npm install -g n
sudo n 5.6
