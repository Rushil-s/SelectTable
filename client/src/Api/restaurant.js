import axios from 'axios';

export const getRestaurants = async (location) => {
  try {
    const res = await axios.get(`/api/restaurant?location=${location}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
