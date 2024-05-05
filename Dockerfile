FROM node:20-alpine

WORKDIR /src

COPY . .

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive && \
  yarn build && \
  yarn cache clean

ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 4000

EXPOSE ${NUXT_PORT}
USER node
CMD ["yarn", "start"]
