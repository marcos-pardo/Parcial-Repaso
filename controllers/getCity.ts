export const getCity = async (cp: string, isoCountry: string): Promise<string>=> {
    
    const API_URL = "http://zip-api.eu/api/v1/info/"; 
    const url = `${API_URL}${isoCountry}-${cp}`; 
    console.log(url);
    
    const response = await fetch(url); if(response.status !== 200) {
    
        throw new Error("Bad Request"); 
    } 
    const data = await response.json(); 
    const city = data.place_name; 
    console.log(city);
    return city; }