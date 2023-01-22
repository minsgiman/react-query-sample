import axios from "axios";

export const fetchWine = () => {
  return axios.get(`https://api.sampleapis.com/wines/reds`);
};

export const addWine = async (wine) => {
  try {
    const result = await axios.post(
      `https://api.sampleapis.com/wines/reds`,
      wine
    );
    if (result.data.error) {
      throw new Error(result.data.error);
    }
    return Promise.resolve(result);
  } catch (e) {
    return Promise.reject(e);
  }
};
