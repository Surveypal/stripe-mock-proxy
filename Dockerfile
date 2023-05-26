FROM node:20-bullseye

RUN apt-get update && apt-get install -y --no-install-recommends \
  && apt-get install -y nginx \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

RUN rm /etc/nginx/sites-enabled/default

COPY docker/nginx/nginx.conf.template /etc/nginx/sites-enabled/stripe-mock
COPY docker/start-service.sh /usr/local/bin

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

EXPOSE 80

CMD ["start-service.sh"]
