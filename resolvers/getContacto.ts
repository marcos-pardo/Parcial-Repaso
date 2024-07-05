import {Request,Response} from "npm:express@4.19.2" 
import {PersonModel} from "../db/Person.ts"
import {Person} from "../types.ts"
export const getContacto = async (req: Request<{dni:string}>,res: Response<Person|{error:unknown}>) => {

    const dni = req.params.dni; 
    if (!dni) {

    res.status(404).send("No se ha encontrado el contacto");

    return; }

    try {

        const agendaContacto = await PersonModel.findOne({dni}).exec(); 
        if (!agendaContacto) {

            res.status(404).send("No se ha encontrado el contacto");

            return; }

            const contactData ={ dni,
                nombre: agendaContacto.name,
                email: agendaContacto.email,
                cp: agendaContacto.cp,
                isoCountry: agendaContacto.isoCountry, 
                city: agendaContacto.city,
                time: agendaContacto.time,
                weather: agendaContacto.weather, };

                res.status(200).send(contactData); }

                catch (error) { 
                    res.status(500).send(error.message); 
                    return; 
                } }