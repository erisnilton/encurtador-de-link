# 🔗 Encurtador de Links

Um simples encurtador de URLs criado com **Node.js**, utilizando **Express**, **PostgreSQL**, **Knex** e conteinerizado com **Docker** e **Docker Compose**.

## 🚀 Tecnologias Utilizadas

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [Knex.js](https://knexjs.org/)
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)
* HTML, CSS e JavaScript (para interface estática)

## ⚙️ Funcionalidades

* Criar URLs curtas a partir de URLs longas
* Redirecionamento automático para a URL original
* Contador de acessos por URL

## 🧑‍💻 Como Rodar o Projeto

### Pré-requisitos

* Docker
* Docker Compose

### Instruções

1. Clone o repositório:

```bash
git clone https://github.com/erisnilton/encurtador-de-link.git
cd encurtador-de-links
```

2. Suba os containers com Docker Compose:

```bash
docker-compose up -d
```

3. Rode as Migrations com Knex
```bash
knex migrate:up
ou
pnpm migrate:up
```

4. Uma página estática simples para testar a funcionalidade pode ser acessada em:

```
http://localhost:3000
```

Essa interface foi desenvolvida com HTML, CSS e JavaScript puros.



## 📝 Exemplos de Uso via Postman

### Criar uma URL encurtada

```
POST http://localhost:3000/shorten
Content-Type: application/json

{   
    "link":"https://erisnilton.dev"
}

```

### Acessar URL encurtada

```
GET /:id
```

## 📚 Migrations com Knex

```bash
knex migrate:up
```

## 🐳 Comandos Úteis com Docker

```bash
# Subir os containers
docker-compose up -d

# Derrubar os containers
docker-compose down
```

## 🛡️ Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
