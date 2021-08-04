FROM nginx:1.21.1
COPY ./dist/recipe-web/browser /usr/share/nginx/html
