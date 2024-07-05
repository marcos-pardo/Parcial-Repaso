import {Request,Response} from "npm:express@4.19.2" 
import {PersonModel} from "../db/Person.ts" 
import {Person} from "../types.ts"
export const AllContacts=async(req:Request, res:Response<Person[]|{error:unknown}>)=>{

    try {

        const allcontactos=await

        PersonModel.find().exec(); 
        if(!allcontactos){

            return res.status(400).send("No hay contactos") }

            res.status(200).send({

                contacto: allcontactos.map((contactos)=>({ 
                    dni: contactos.dni,
                    nombre: contactos.name,
                    email: contactos.email,
                    cp: contactos.cp,
                    isoCountry: contactos.isoCountry,
                    city: contactos.city,
                    time: contactos.time,
                    weather: contactos.weather,

                })), 
        });

            } catch (error) { 
                res.status(500).send(error.message); 
                return; 
            } }