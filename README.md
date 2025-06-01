# Elasticsearch

API para testar Elasticsearch

---

## 1 - Crie um arquivo `.env` com as variáveis:

```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=users_db
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin

ELASTICSEARCH_NODE=http://localhost:9200
ELASTICSEARCH_INDEX=users
```

---

## 2 - Suba os containers:

```bash
docker-compose up -d
```

---

## 3 - Instale os pacotes:

```bash
yarn install
```

---

## 4 - Popule o banco e o Elasticsearch com dados fake:

```bash
yarn run seed
```

---

## 5 - Rode o projeto:

```bash
yarn run dev
```

---

## Endpoints de busca

- Busca pelo Elasticsearch:

```
GET http://localhost:3000/users/elastic?name=joao&page=1&size=10
```

- Busca pelo Postgres:

```
GET http://localhost:3000/users/postgres?name=joao&page=1&size=10
```

---

## Validação e análise

Se quiser validar dados do Elasticsearch, criar queries e outras funcionalidades, pode usar o Kibana:

[Kibana](http://localhost:5601)

---

## Referências

- [Documentação Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)  
- [Kibana](https://www.elastic.co/kibana/)  
- [Documentação PostgreSQL](https://www.postgresql.org/docs/)
