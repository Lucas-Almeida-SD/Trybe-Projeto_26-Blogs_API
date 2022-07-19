# Projeto Blogs API

Esse projeto foi realizado para exercitar o que foi aprendido no Bloco 24 do Módulo de Back End do curso da [Trybe](https://www.betrybe.com/), no qual foi sobre `ORM (Object Relational Mapping)`, `JWT` e `testes de integração`.

Nesse projeto foi desenvolvida uma `REST API` utilizando arquitetura de software `MSC` através do `Node.js` e `Express`. Além disso, foi utilizado o `Sequelize` como `ORM (Object-Relational Mapper) - Mapeamento Objeto-Relacional`, ou seja, através dele foi possível criar o banco de dados, criar, popular e relacionar tabelas e também manipular os dados do database, realizando operações de `CRUD` (create, read, update e delete) utilizando apenas métodos JavaScript.

A API é um sistema de gerenciamento de conteúdo para um blog, no qual permite manipular dados dos usuários, dos posts e suas categorias.

Para a gestão de dados, foi utilizado o sistema MySQL.

Para verificar a funcionalidade da API, foram desenvolvidos testes de integração com as ferramentas `Mocha` e `Chai`, além de utilizar um database próprio para os testes.

Para documentação da API foi utilzado o framework Swagger, no qual permitiu identificar quais `endpoints` podem ser utilizados na mesma, além de exibir os dados necessários na requisição e também os dados entregues na sua resposta.

## Tecnologias

  - Node.js
  - Express
  - Sequelize
  - MySQL
  - Mocha e Chai

## Como executar

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone git@github.com:Lucas-Almeida-SD/Trybe-Projeto_26-Blogs_API.git
$ cd Trybe-Projeto_26-Blogs_API
```

Para iniciá-lo, siga os passos abaixo:

<details>
  <summary><strong>Com Docker</strong></summary>

  ```bash
  # Criar container
  $ docker-compose up -d

  # Abrir terminal interativo do container
  $ docker container exec -it store_manager bash

  # Instalar as dependências
  $ npm install

  # Deletar o banco de dados (caso exista)
  $ npm run drop

  # Criar o banco de dados
  $ npm run create

  # Criar tabelas
  $ npm run migrate

  # Popular tabelas do banco de dados
  $ npm run seed

  # Iniciar o projeto
  $ npm start
  ```

  Para executar os testes, utilize o terminal interativo do container e insira o comando abaixo: 

  ```bash
  $ npm run test
  ```
</details>

<details>
  <summary><strong>Sem Docker</strong></summary>

  ```bash
  # Instalar as dependências
  $ npm install

  # Deletar o banco de dados (caso exista)
  $ npm run drop

  # Criar o banco de dados
  $ npm run create

  # Criar tabelas
  $ npm run migrate

  # Popular tabelas do banco de dados
  $ npm run seed

  # Iniciar o projeto
  $ npm start
  ```

  Para executar os testes, utilize o terminal e insira o comando abaixo: 

  ```bash
  $ npm run test
  ```
</details>

Acesse a documentação da API no link [localhost:3000/docs](http://localhost:3000/docs).