FROM nginx
WORKDIR /usr/share/nginx/html
COPY MP_verify_JG2pKapgJE4RW5FC.txt /usr/share/nginx/html/
COPY dist/ /usr/share/nginx/html/
COPY MP_verify_JG2pKapgJE4RW5FC.txt /usr/share/nginx/html/p/
EXPOSE 80
