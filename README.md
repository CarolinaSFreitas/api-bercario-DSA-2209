# DSA 22/09

Aula 9.2 de Desenvolvimento de Serviços e APIs - ASSOCIAÇÕES - 1-N - 22/09

# 👶🏻 BERÇÁRIO 

#### Documentação do Sequelize sobre associações: 
+ https://sequelize.org/docs/v6/core-concepts/assocs/

### Lembrando que:

**Pra iniciar**:
1. `` npm init -y ``
2. `` npm i express sequelize mysql2 cors ``
3. `` npm i --save-dev nodemon ``
4. `` npx nodemon app ``
5. No VS, criar um "app.js" como o arquivo do repo
6. ⚠️ Alterar o "package.json", adicionando a linha `` "type": "module", `` após a linha de "main": "index.js","

⚠️ **OBS: alterar os nomes, está com os nomes da API da vinícola** ⚠️

**Banco de Dados**:
1. Criar a pasta "database" com um arquivo chamado "conecta.js" e lá dentro inserir:

```
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('aula', 'aluno', 'senacrs', {
    host: 'localhost',
    dialect: 'mysql', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    port: 3306 
  });
  
````

**No Insomnia**:
1. URL: http://localhost:3000/aula
2. Criar uma pasta pro projeto
3. **CRUD**: Criar as HTTP Requests básicas (GET (listagem), POST (criação do registro no banco), PUT (alterações no registro), DEL (exclusão do registro))

----

## ⚠️ Atenção: Em 'app.js'

Deve-se criar primeiro a tabela que é dona da chave estrangeira, como nesse caso, **médico, bebê e mãe**

![image](https://github.com/CarolinaSFreitas/DSA-2209/assets/99994934/9260e37d-9ac4-4e0a-97f3-e9186c595143)

## 🔑 Chave Estrangeira - Para fazer o Relacionamento 1-N (um pra muitos)

1. Após criar as tabelas em Models (Médico, Mãe, Bebê), fora da definição dos campos deve-se indicar na tabela que vai receber a chave estrangeira:

````
Vinho.belongsTo(Marca, {
    foreignKey: {
        name: "marca_id",
        allowNull: false
    },
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
})

Marca.hasMany(Vinho, {
    foreignKey: "marca_id"
})
````

Dessa forma ele importará a model 'Marca.js' e receberá a foreign key 

![image](https://github.com/CarolinaSFreitas/DSA-2209/assets/99994934/3f3d3c10-3e58-4c35-841f-08f65bd8cd71)

## 🕹️ Controllers e Routes 🛣️

1. Tem que criar um controller para cada na pasta controllers, o **medicoController**, **bebeController** e **maeController**.

2. Em 'routes.js', deve-se criar rotas para cada controller, como da seguinte forma: 

![image](https://github.com/CarolinaSFreitas/DSA-2209/assets/99994934/5fe2d46b-f6eb-4755-8439-c715a17efaca)

## Pra listagem trazer os dados da tabela que tá como FK, deve-se adicionar a linha no controller das tabelas:

+ Em vinhoController:

````
    try {
        const vinhos = await Vinho.findAll({
          include: Marca
        })
````
