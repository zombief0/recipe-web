FROM nginx:1.21.1
COPY ./dist/recipe-web /usr/share/nginx/html
