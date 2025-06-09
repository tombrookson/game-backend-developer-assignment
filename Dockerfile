FROM node:20-alpine
ARG FIREBASE_VERSION=14.6.0
RUN apk --no-cache add openjdk11-jre bash curl openssl gettext nano nginx sudo && \
    npm cache clean --force && \
    npm i -g firebase-tools@$FIREBASE_VERSION
COPY ./infrastructure/config/nginx.conf /etc/nginx/
COPY ./infrastructure/scripts/serve.sh /usr/bin/
RUN chmod +x /usr/bin/serve.sh
WORKDIR /srv/firebase
ENTRYPOINT ["/usr/bin/serve.sh"]