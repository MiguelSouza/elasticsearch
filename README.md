# elasticsearch
Api para testar elastic search

1- Crie um arquivo .env:

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=users_db
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin

ELASTICSEARCH_NODE=http://localhost:9200
ELASTICSEARCH_INDEX=users

2- Suba os containers
docker-compose up -d

3- Instale os pacotes
yarn install

4- Popular o banco e o elasticsearch com faker data
yarn run seed

5- Rodar o projeto
yarn run dev

Busca pelo elastsearch
GET http://localhost:3000/users/elastic?name=joao&page=1&size=10

Busca pelo postgres
GET http://localhost:3000/users/postgres?name=joao&page=1&size=10

Se quiser validar dados do elastic search, criar queries e outras funcionalidades, pode usar o Kibana
http://localhost:5601

Referencias
https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html
https://www.elastic.co/kibana/
https://www.postgresql.org/docs/




