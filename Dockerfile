FROM node:16
WORKDIR /usr/src/app

COPY . .
RUN echo tester | npx @backstage/create-app
WORKDIR /usr/src/app/tester
CMD yarn dev
