// api/transaction.js

import axios from 'axios';

const fetchUser = async (page) => {
  try {
    const response = await axios.get(`http://localhost:3000/user?page=${page}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message || 'Error from axios/server');
  }
};

export { fetchUser };
