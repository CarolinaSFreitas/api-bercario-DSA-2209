import express from 'express'
import { sequelize } from './database/conecta.js'
import { Medico } from './models/Medico.js'
import { Mae } from './models/Mae.js'
import { Bebe } from './models/Bebe.js'
import routes from './routes.js'
import cors from 'cors'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use(routes)
app.use(express.static('images'));


async function conecta_db() {
  try {
    await sequelize.authenticate();
    console.log('Conexão bem sucedida.');

    await Mae.sync()          //A MAE PRECISA CRIAR PRIMEIRO PQ ELA É A DONA DA FOREIGN KEY - vai ciar a tabela no banco(se nao existir já) e permitir alterações de campos 
    console.log("Tabela de Mães: Ok!")

    await Medico.sync()          //vai ciar a tabela no banco(se nao existir já) e permitir alterações de campos 
    console.log("Tabela de Médicos: Ok!")

    await Bebe.sync()          //vai ciar a tabela no banco(se nao existir já) e permitir alterações de campos 
    console.log("Tabela de Bebês: Ok!")

    await sequelize.authenticate();
    console.log('Conexão bem sucedida.');
  } catch (error) {
    console.error('Impossível conectar ao banco de dados:', error);
  }
}
conecta_db()

app.listen(port, () => {
  console.log(`API do Hospital Careful Rodando na Porta ${port}`)
})

app.get('/', (req, res) => {
  res.send(`
    <html lang="pt-br">
      <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="shortcut icon" href="./hosp.jpg" type="image/x-icon" />
      <title>Hospital Careful</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400&display=swap');
          .welcome-text {
            font-family: 'Montserrat', sans-serif;
            font-size: 32px;
            color: #010103;
            margin-top: 20px;
            text-align: center;
            font-weight: bold;
          }
          .center-image {
            display: block; 
            margin: 0 auto; 
            margin-top: 20px;
            border-radius: 10px;
          }
          .button-container {
            text-align: center;
            margin-top: 20px; 
          }
          .button-container button {
            display: inline-block; 
            padding: 10px 10px; 
            background-color: #45AC8B; 
            border: none;
            border-radius: 10px; 
            cursor: pointer; 
            margin: 10px; 
          }
          .button-container button a{
            color: #010103; 
            text-decoration: none; 
            font-family: 'Montserrat', sans-serif; 
            font-size: 18px; 
            font-weight: bold;
          }
          #centro{
            color: #010103;
            font-size: 28px;
            font-weight: 400;
          }
          .button-container button:hover {
            background-color: #4ed28e; 
        </style>
      </head>
      <body>
        <div class="welcome-text">Bem-vindo(a)! <br> Sistema do Hospital Careful <p id="centro">Centro Obstétrico</p></div>
        <img src="/mbm.png" alt="Mãe, bebê e médico" class="center-image" width="620px">
        
        <div class="button-container">
        <button><a href="/maes" target="_blank" style="display: block; text-align: center; padding: 5px;">Ir para Mães</a></button>
      
        <button><a href="/bebes" target="_blank" style="display: block; text-align: center; padding: 5px;">Ir para Bebês</a></button>
        </div>
        </div>
        
        <div class="button-container">
        <button><a href="/medicos" target="_blank" style="display: block; text-align: center; padding: 5px;">Ir para Médicos</a></button>
        </div>

      </body>
    </html>
  `);
});

