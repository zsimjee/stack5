FROM node:16
WORKDIR /usr/src/app

RUN echo tester | npx @backstage/create-app
COPY . .
CMD "cd my-backstage-app; yarn dev"
