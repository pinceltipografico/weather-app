FROM node:10
COPY . .
RUN npm install && npm install -g serve
RUN npm run build --production
CMD serve -s build
EXPOSE 5000
