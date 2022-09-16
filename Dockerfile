#Base Cypress Image
FROM cypress/included:10.8.0

#Working Directory in the container
WORKDIR /cypress-tests

#Adding the below line to prevent cache, followed by copying files to the image
ADD "https://www.random.org/cgi-bin/randbyte?nbytes=10&format=h" skipcache
COPY ./cypress ./cypress
COPY ./cypress.config.js ./cypress.config.js
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

#Install packages & Set proxy to connect to aqua
RUN npm i
ENV HTTP_PROXY=http://10.71.1.42:3128

#Script to run when running the container
ENTRYPOINT [ "yarn", "test" ]