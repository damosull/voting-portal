FROM cypress/included:9.7.0

WORKDIR /cypress-tests

COPY ./cypress ./cypress
COPY ./cypress.json ./cypress.json
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm i

ENV HTTP_PROXY=http://10.71.1.42:3128

ENTRYPOINT [ "yarn", "test" ]