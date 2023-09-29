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

Deve-se criar primeiro a tabela que é dona da chave estrangeira, como nesse caso, **mãe, médico e bebê**

![image](https://github.com/CarolinaSFreitas/api-bercario-DSA-2909/assets/99994934/4500bb07-7a6e-480c-8648-8f77f7dad0e3)

## 🔑 Chave Estrangeira - Para fazer o Relacionamento 1-N (um pra muitos)

1. Após criar as tabelas em Models (Médico, Mãe, Bebê), fora da definição dos campos deve-se indicar na tabela que vai receber a chave estrangeira (Bebê):

````
// após construir a tabela do model, os relacionamentos são feitos fora, SOMENTE NO BEBE PQ É A TABELA QUE RECEBE AS FK:

//relacionamento bebe-mãe
Bebe.belongsTo(Mae, {
    foreignKey: {
        name: "mae_id",
        allowNull: false
    },
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
})

Mae.hasMany(Bebe, {
    foreignKey: "mae_id"
})

//relacionamento bebê-médico
Bebe.belongsTo(Medico, {
    foreignKey: {
        name: "medico_id",
        allowNull: false
    },
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
})

Medico.hasMany(Bebe, {
    foreignKey: "medico_id"
})
````

Dessa forma ele importará as models 'Mãe.js' e 'Médico.js' e receberá as foreign keys

![image](https://github.com/CarolinaSFreitas/api-bercario-DSA-2909/assets/99994934/32880fd5-78f8-486d-b894-b1940d3e5c98)
![image](https://github.com/CarolinaSFreitas/api-bercario-DSA-2909/assets/99994934/34cfc322-9541-4059-982d-8d368d2ba71c)

## 🕹️ Controllers e Routes 🛣️

1. Tem que criar um controller para cada na pasta controllers, o **medicoController**, **bebeController** e **maeController**.

2. Em 'routes.js', deve-se criar rotas para cada controller, como da seguinte forma: 

![image](https://github.com/CarolinaSFreitas/api-bercario-DSA-2909/assets/99994934/90745d6a-97ed-4b23-9299-f1f868f48bcd)

## Pra listagem trazer os dados da tabela que tá como FK, deve-se adicionar a linha no controller das tabelas:

+ Em vinhoController:

````
//função de get - vai listar os bebês no insomnia
export async function bebesIndex(req, res) {
    try {
        const bebes = await Bebe.findAll({
            include: [Mae, Medico], //aqui lista os bebês e já inclui a sua mãe e o médico
        })
        res.status(200).json(bebes)
    } catch (error) {
        res.status(400).send(error)
    }
}
````
