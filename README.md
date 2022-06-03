[![CodeQL](https://github.com/williamkoller/descomplicando-nestjs/actions/workflows/codeql.yml/badge.svg?branch=main)](https://github.com/williamkoller/descomplicando-nestjs/actions/workflows/codeql.yml)

# Descomplicando Nestjs

- Requerido `docker` e `docker-compose`

## Como rodar esse projeto?!

1 - copiar o arquivo `.env.sample` para `.env` => `cp -r .env.sample .env`

  - 1.1 - exemplo do arquivo `.env`
  ```
  # Application
  APP_URL=http://descomplicando-nestjs
  DEFAULT_STRATEGY=jwt
  JWT_SECRET=secret
  JWT_EXPIRES_IN=2h
  NODE_ENV=development
  PORT=3001
  PROPERTY_USER=user
  SESSION=false
  LOGGING=false

  # Database
  POSTGRES_HOST=localhost
  POSTGRES_PORT=5432
  POSTGRES_USER=docker
  POSTGRES_PASSWORD=docker
  POSTGRES_DATABASE=docker_db

  #Nginx
  NGINX_PORT=80
  ```

2 - rodar o projeto com o docker:

  - 2.1 - `docker-compose up` ou `make up`

3 - rodar as migrations:
  
  - 3.1 - acessar o container do projeto `docker exec -it descomplicando-nestjs sh`
  - 3.2 - rodar migrations `yarn typeorm:migration:run`

4 - adicionar o server_name no hosts do seu computador:
  
  - 4.1 `sudo nano /etc/hosts`
    ```
    127.0.0.1    descomplicando-nestjs
    ```

5 - projeto pronto para ser usado.