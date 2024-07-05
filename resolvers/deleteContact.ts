import { Request, Response } from "npm:express@4.18.2";
import { PersonModel } from "../db/Person.ts";
export const deleteContacts = async (req: Request, res: Response) => {
    try {
        const { dni } = req.params.dni;
        const autor = await PersonModel.findOneAndDelete({ dni} ).exec();
        if (!autor) {
            res.status(404).send("Persona no encontrado");
            return;
        }
        res.status(200).send("Persona eliminado");
    } catch (error) {
        res.status(404).send(error.message);
        return;
    }
};