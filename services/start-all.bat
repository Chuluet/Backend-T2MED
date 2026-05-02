@echo off
echo Iniciando microservicios...

start "user-service" cmd /k "cd user-service && npm run start:dev"
start "appointments-service" cmd /k "cd appointments-service && npm run start:dev"
start "meds-service" cmd /k "cd meds-service && npm run start:dev"
start "med-conditions-service" cmd /k "cd med-conditions-service && npm run start:dev"
start "api-gateway" cmd /k "cd api-gateway && npm run start:dev"

echo Todos los servicios iniciados.