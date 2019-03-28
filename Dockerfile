FROM registry.lab.example.com/rhscl/nodejs-6-rhel7

MAINTAINER username "username@example.com"

EXPOSE 3000

COPY . /opt/app-root/src

RUN source scl_source enable rh-nodejs6 && \
    npm install --registry=http://services.lab.example.com:8081/nexus/content/groups/nodejs/

CMD /bin/bash -c 'node app.js'
