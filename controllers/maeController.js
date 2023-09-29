import { Bebe } from "../models/Bebe.js"
import { Mae } from "../models/Mae.js"

//função de get - vai listar as mães no insomnia
export async function maesIndex(req, res) {
    try {
        const maes = await Mae.findAll({
            include: Bebe                 //aqui lista as mães e já inclui os seus respectivos bebês
        })
        res.status(200).json(maes)
    } catch (error) {
        res.status(400).send(error)
    }
}
