#!/bin/sh

echo "Start run s portir..." 
cd target
sudo java -jar JWTSpringAngularWithRoles-0.0.1-SNAPSHOT.jar &
cd ../src/main/angular/dist
ng serve --host 0.0.0.0 --ssl true --ssl-cert /home/john/ssl/example.crt --ssl-key /home/john/ssl/example.key

echo "*************************************************************"

 

echo "Pokrenuo..."
