import axios from 'axios';

export const signup = async (user) => {
  try {
    const res = await axios.post('/api/user', user);
    return res.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const login = async ({ email, password }) => {
  try {
    const res = await axios.post('/api/session', { email, password });
    return res.data;
  } catch (err) {
    console.log(err);
    return {};
  }
};
