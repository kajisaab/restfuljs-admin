FROM node:20-alpine

WORKDIR /home/app
RUN mkdir -p /home/app

COPY . /home/app

# RUN apt update && apt install tzdata -y
# ENV TZ="Asia/Kathmandu"
# RUN apt update && apt -y install tzdata &&  cp /usr/share/zoneinfo/Asia/Kathmandu /etc/localtime && echo "Asia/Kathmandu" > /etc/timezone

COPY package*.json ./

RUN npm install 

COPY . .  

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
