import { Countries } from "../lib/definitions";
import { fetchCountries } from '../lib/data';

export async function setSecret(): Promise<Countries> {
  let randomCountry: Countries | undefined; // Initialize to undefined
  try {
    let data = await fetchCountries(); // Add await here
    
    let population = 0;
    while (!randomCountry || population < 500000) { // Adjusted loop condition
      const countries = Object.keys(data);
      const randomIndex = Math.floor(Math.random() * countries.length);
      randomCountry = data[randomIndex];
      console.log('Random Countries:', randomCountry)
      if(randomCountry) {
        population = randomCountry?.population;
      }
    }
    console.log('Random Countries population:', randomCountry.name);
    return randomCountry;
  } catch (error) {
    console.error("Error fetching random Countries:", error);
    throw error; // Rethrow the error to propagate it
  }
}