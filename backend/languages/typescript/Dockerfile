FROM node:18

WORKDIR /app

COPY ./runner.ts /app/runner.ts

RUN npm install -g ts-node typescript

CMD ["ts-node", "runner.ts"]
