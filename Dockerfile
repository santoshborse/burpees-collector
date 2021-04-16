FROM us.icr.io/redsonja_hyboria/watson-base-nodejs12-rhubi8

LABEL maintainer="Santosh Borse <ssborse@us.ibm.com>" \
  vendor="IBM" \
  name="WES"

USER root
RUN true \
  && microdnf update \
  && microdnf install curl \
  && microdnf clean all \
  && useradd -u 1001 -r -g 0 -s /usr/sbin/nologin default \
  && true

RUN mkdir -p /usr/src/app

COPY ./certificates /usr/src/app/certificates
WORKDIR /usr/src/app
COPY package.json server.js ./
RUN npm install
RUN chown -R 1001:0 /usr/src/app
USER 1001
EXPOSE 3000
CMD ["npm", "start"]
