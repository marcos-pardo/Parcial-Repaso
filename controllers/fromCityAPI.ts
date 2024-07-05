export type fromCityAPI = { time: string;
    weather: string;
}
    export const getTiempo = async (city: string) :Promise<fromCityAPI>=> {

        const API_URL = "http://api.weatherapi.com/v1/current.json?key=8cfc595a154145fb912201320230510&q=";

        const url = `${API_URL}${city}&aqi=no`; 
        console.log(url);

        const response = await fetch(url); 
        if(response.status !== 200){

            throw new Error("City not found"); 
        } 
        const data = await response.json(); 
        const time = data.location.localtime; 
        const weather = data.current.temp_c; 
        const conjunto = {time,weather}; 
        return conjunto; 
    }