import axios from "axios";

export const fetchCoffee = (type) => {
  return axios.get(`https://api.sampleapis.com/coffee/${type}`);
};

export const addCoffee = async ({ type, coffee }) => {
  try {
    const result = await axios.post(
      `https://api.sampleapis.com/coffee/${type}`,
      coffee
    );
    if (result.data.error) {
      throw new Error(result.data.error);
    }
    return Promise.resolve(result);
  } catch (e) {
    return Promise.reject(e);
  }
};
