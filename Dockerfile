FROM node:10-alpine

ENV HOME=/usr/src/app
RUN mkdir -p $HOME
WORKDIR $HOME

RUN yarn global add @express-generator
RUN yarn global add sequelize-cli
RUN yarn

EXPOSE 3000

USER 1000
