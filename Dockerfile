FROM node:16
WORKDIR /usr/src/app

COPY . .
RUN echo tester | npx @backstage/create-app

CMD "cd my-backstage-app; yarn dev"
