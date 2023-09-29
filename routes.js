import { Router } from "express"
import { maesIndex} from "./controllers/maeController.js"
import { medicosIndex } from "./controllers/medicoController.js"
import { bebesIndex, bebeCreate, bebeAlteraNome } from "./controllers/bebeController.js"

const router = Router()

// --------------------------------------------------------- ROTAS DE MÃES
router.get("/maes", maesIndex) //rota pra listagem

// --------------------------------------------------------- ROTAS DE MÉDICOS
router.get("/medicos", medicosIndex) //rota pra listagem de marcas, já com os bebês dos partos realizados pelos médicos

// --------------------------------------------------------- ROTAS DE BEBÊS
router.get("/bebes", bebesIndex) //rota pra listagem de bebês, já com os bebês e suas respectivas mães
      .post("/bebes", bebeCreate) //rota pra criação de registro
      .patch("/bebes/:id", bebeAlteraNome) //rota pra alterar registro do bebê mas só um atributo, nesse caso, nome
export default router

