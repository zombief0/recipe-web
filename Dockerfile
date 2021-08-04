FROM nginx:1.21.1
COPY ./dist/recipe-web/browser /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
