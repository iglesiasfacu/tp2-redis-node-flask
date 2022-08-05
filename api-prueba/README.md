## Api para conectar Redis desde Docker con Node JS

### 1- Descargar imagen de redis

`docker pull redis`

### 2- Crear contenedor y correrlo en demon mode

`docker run --name redisDb -d redis`

Al crear el cliente con createClient() se utilizara automaticamente el puerto 6379 y el localhost 127.0.0.1

### Importante instalar: `sudo apt install redis-server`

Esto evitara errores de conexiones
