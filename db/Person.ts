import mongoose from "npm:mongoose@8.4.4"
import { Person } from "../types.ts" 
const Schema = mongoose.Schema; const PersonSchema = new Schema({
    dni: { type: String, required: true },
    name: { type: String, required: true }, 
    email: { type: String, required: true },
    cp: { type: String, required: true }, 
    isoCountry: { type: String, required: true }, 
    city: { type: String, required: false },
    time: { type: String, required: false },    
    weather: { type: String, required: false }, 
})
 
export type PersonModelType=mongoose.Document&Omit<Person,"id"> 
export const PersonModel=mongoose.model<PersonModelType>("Person", PersonSchema)
