FRONTEND
For run angular on https with ssl, just run npm start
ng serve --host 0.0.0.0 --ssl true --ssl-cert '/home/john/ssl/example.crt' --ssl-key '/home/john/ssl/example.key'


BACKEND
For configure Spring you must implement this:
https://www.baeldung.com/spring-boot-https-self-signed-certificate

DATABASE
cd database docker-compose up