import axios from 'axios';

export const book = async (booking) => {
  try {
    const res = await axios.post('api/booking', booking);
    return res.data;
  } catch (err) {
    console.log(err);
    return {};
  }
};

export const getBookings = async (userId) => {
  try {
    const res = await axios.get(`/api/booking?userId=${userId}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
