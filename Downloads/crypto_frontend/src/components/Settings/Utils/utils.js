import axios from "axios";

export const getCitiesByCountry = async (requestBody) => {

    console.log("The requestBody in the APi call is", requestBody);
    try {
        const resp = await axios.post(`https://countriesnow.space/api/v0.1/countries/cities`, requestBody);
       
        return resp.data.data;
    } catch (error) {
        console.error("Error while fetching cities by country:", error);
        throw error; // Re-throw the error to be caught by the caller
    }
};

export const getAllCountries = async () => {
    try {
        const resp = await axios.get(`https://countriesnow.space/api/v0.1/countries/iso`);
       
        return resp.data.data;
    } catch (error) {

        console.error("Error while fetching upcoming sessions:", error);
        throw error; // Re-throw the error to be caught by the caller
    }
};


async function getAllCountriesFn(){

    const response = await getAllCountries();
    
    const countriesList = response.map((country ,index) => {
      return {
        key: index + 1, // Assuming keys start from 1
        value: country.name,
        label : country.name,
      };
    });
  
    return countriesList;
  }


async function getCitiesByCountryFn(requestBody){

    const response = await getCitiesByCountry(requestBody);
  
    const citiesListByCountry = response.map((cities, index) => {
      return {
        key: index + 1, // Assuming keys start from 1
        value: cities
      };
    });
  
    return citiesListByCountry;
  
  }

  export {getCitiesByCountryFn, getAllCountriesFn}