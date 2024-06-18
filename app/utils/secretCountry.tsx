import { Country } from '../types/country';

export async function setSecret(): Promise<Country> {
  let randomCountry: Country | undefined; // Initialize to undefined
  try {
    const response = await fetch(`https://countryapi.io/api/all?apikey=${process.env.NEXT_PUBLIC_API_KEY}`);
    const data = await response.json();
    let population = 0;
    while (!randomCountry || population < 100000) { // Adjusted loop condition
      const countries = Object.keys(data);
      const randomIndex = Math.floor(Math.random() * countries.length);
      const randomCountryCode = countries[randomIndex];
      randomCountry = data[randomCountryCode];
      if(randomCountry) {
        population = randomCountry?.population;
      }
    }
    console.log('Random country population:', randomCountry.name);
    return randomCountry;
  } catch (error) {
    console.error("Error fetching random country:", error);
    throw error; // Rethrow the error to propagate it
  }
}
