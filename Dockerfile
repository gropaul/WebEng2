FROM node:15.5.0-alpine3.10

WORKDIR /webeng
COPY ./ ./
RUN npm install
RUN npm run build-prod
RUN npm install -g serve

EXPOSE 8080
CMD serve -s www -l 8080
