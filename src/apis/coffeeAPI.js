import axios from "axios";
import { Coffees } from "./coffeeSchema";

export const fetchCoffee = async (type) => {
  const { data } = await axios.get(`https://api.sampleapis.com/coffee/${type}`);

  return Coffees.parse(data);
};

export const addCoffee = async ({ type, coffee }) => {
  try {
    const { data } = await axios.post(
      `https://api.sampleapis.com/coffee/${type}`,
      coffee
    );
    if (data.error) {
      throw new Error(data.error);
    }
    return Coffees.parse(data);
  } catch (e) {
    return Promise.reject(e);
  }
};
