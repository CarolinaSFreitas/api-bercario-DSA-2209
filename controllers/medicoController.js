import { Bebe } from "../models/Bebe.js"
import { Medico } from "../models/Medico.js"

//função de get - vai listar as mães no insomnia
export async function medicosIndex(req, res) {
    try {
        const medicos = await Medico.findAll({
            include: Bebe                 //aqui lista os médicos e já inclui os seus respectivos bebês dos partos
        })
        res.status(200).json(medicos)
    } catch (error) {
        res.status(400).send(error)
    }
}

