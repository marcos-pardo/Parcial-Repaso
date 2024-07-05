import {Request,Response} from "npm:express@4.19.2" 
import {PersonModelType,PersonModel} from "../db/Person.ts" 
import { getCity } from "../controllers/getCity.ts";
import { getTiempo} from "../controllers/fromCityAPI.ts"; 
import {Person} from "../types.ts"

export const updateContact=async(req:Request<{ id: string }, {}, PersonModelType>, res:Response<Person|{error:unknown}>)=>{ const dni=req.params.dni;
const {name,email,cp,isoCountry}=req.body 
if(!name || !email || !cp || !isoCountry){
return res.status(500).send("Faltan datos") }

if(typeof name !== "string" || typeof email !== "string" || typeof cp !=="string" || typeof isoCountry !== "string"){
return res.status(500).send("Los datos no son del tipo correcto")
}
try {
const city = await getCity(cp, isoCountry); 
const {time, weather} = await getTiempo( city); 
try{
const contactUpdate = await PersonModel.findOneAndUpdate({dni},{ name,email,cp,isoCountry,city, time,weather,}); 

if(!contactUpdate){
return res.status(400).send("No existe un contacto con ese dni") }
res.status(200).send({ dni,name,email,cp,isoCountry,city, time,weather,}); 
}catch(error){
res.status(400).send(error.message); 
console.log("Problema saving data to MongoDB") 
return;
}
} catch (error) {
res.status(500).send(error.message) } }