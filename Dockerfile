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

USER node
CMD ["yarn", "start"]
