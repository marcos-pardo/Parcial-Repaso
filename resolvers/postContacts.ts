import {Request,Response} from "npm:express@4.19.2" 
import {PersonModelType,PersonModel} from "../db/Person.ts"
import { getCity } from "../controllers/getCity.ts"; 
import { getTiempo} from "../controllers/fromCityAPI.ts";
import { Person } from "../types.ts" 

export const postContacts=async(req:Request<{}, {}, PersonModelType>, res:Response<Person|{error:unknown}>)=>{

    const {dni,name,email,cp,isoCountry}=req.body 
    if(!dni || !name || !email || !cp || !isoCountry){

        return res.status(500).send("Faltan datos") }

        if(typeof dni !== "string" || typeof name !== "string" || typeof email !== "string" || typeof cp !== "string" || typeof isoCountry !== "string"){

            return res.status(500).send("Los datos no son del tipo correcto")

        }

        const alreadyExists=await PersonModel.findOne({dni})

        if(alreadyExists){

            return res.status(400).send("Ya existe un contacto con ese dni") }

                try {

                    const city = await getCity(cp, isoCountry); 
                    console.log(city);
                    const {time, weather} = await getTiempo( city); try{

                    const newPerson = new PersonModel({ dni,name, email,cp,isoCountry,city,time, weather, });

                        await newPerson.save(); 
                        
                        res.status(200).send({

                            dni,name,email,cp, isoCountry, });

                        } catch(error){

                            res.status(400).send(error.message);

                            console.log("Problema saving data to MongoDB")

                            return; }

                } catch (error) { res.status(500).send(error.message)

}}