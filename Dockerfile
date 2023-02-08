FROM ubuntu:20.04

#update environment
RUN apt-get -y upgrade
RUN apt-get -y update
RUN apt-get -y --with-new-pkgs upgrade
RUN apt-get -y autoremove

#install curl
RUN apt-get -y install curl wget

#install node
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get -y install nodejs
RUN node --version
RUN npm --version

#set timezone
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && \
    apt-get install -yq tzdata && \
    ln -fs /usr/share/zoneinfo/Europe/Lisbon /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata

ENV TZ="Europe/Lisbon"

#install chrome
RUN curl -LO https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get install -y ./google-chrome-stable_current_amd64.deb
RUN rm google-chrome-stable_current_amd64.deb

#install git
RUN apt-get -y install git

#install app dependencies
COPY package.json /

#install dependencies
RUN npm install

#install app dependencies
COPY package.json .

#install dependencies
RUN npm install

# Bundle app source
COPY . /

#CMD  npm run testJenkins
CMD npm run jenkinsTag '@6401' --host=https://qa-lab2.finesource.org --domain=tests.surbhi --domain_uuid=94ee4b33-0213-4f81-887c-2130b9e8193c