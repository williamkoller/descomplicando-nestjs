# Descomplicando Nestjs

- Requerido `docker` e `docker-compose`

## Como rodar esse projeto?!

1 - copiar o arquivo `.env.sample` para `.env` => `cp -r .env.sample .env`

2 - rodar o projeto com o docker:

  - 2.1 - `docker-compose up` ou `make up`

3 - rodar as migrations:
  
  - 3.1 - acessar o container do projeto `docker exec -it descomplicando-nestjs sh`
  - 3.2 - rodar migrations `yarn typeorm:migration:run`

4 - projeto pronto para ser usado.