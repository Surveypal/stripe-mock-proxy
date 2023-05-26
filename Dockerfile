FROM node:20-bullseye

RUN apt-get update && apt-get install -y --no-install-recommends \
  && apt-get install -y nginx gettext-base \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

RUN rm /etc/nginx/sites-enabled/default

COPY docker/nginx/nginx.conf.template /etc/nginx/sites-available/stripe-mock
COPY docker/start-service.sh /usr/local/bin

WORKDIR /
COPY docker/docker-entrypoint.sh /
COPY docker/docker-entrypoint.d/ /docker-entrypoint.d

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

EXPOSE 80

ENTRYPOINT [ "/docker-entrypoint.sh" ]
CMD ["start-service.sh"]
