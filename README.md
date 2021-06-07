# Desafio API Graphql - Stefanini

### Atividade de Desenvolvimento

- [x] Desenvolver em Node.js (obrigatório)
- [x] Desejável utilizar `Typescript` e os seguintes frameworks: `graphql-yoga e TypeORM`
- [x] Criar API para buscar a cotação do dólar comercial de uma determinada data a ser informada na requisição.
- [x] Gravar no Banco de dados (postgres, mysql, ou mongo)

### Query
```graphql
query busca {
  cotacoes {
    id
    timestamp
    data
    cotacaoVenda
    cotacaoCompra
    cotacaoData
  }
}
```

### Mutation
```graphql
mutation criarCotacao {
  criarCotacao(data: "05/03/2020") {
    id
    timestamp
    data
    cotacaoVenda
    cotacaoCompra
    cotacaoData
  }
}
```

### Dependencias (package.json)
```json
{
   "devDependencies": {
      "@types/node": "^8.0.29",
      "nodemon": "^2.0.7",
      "ts-node": "3.3.0",
      "typescript": "3.3.3333"
   },
   "dependencies": {
      "axios": "^0.21.1",
      "graphql-yoga": "^1.18.3",
      "moment": "^2.29.1",
      "mongodb": "^3.0.8",
      "reflect-metadata": "^0.1.10",
      "typeorm": "0.2.34"
   }
}
```
