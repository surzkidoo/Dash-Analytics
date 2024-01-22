// api/transaction.js

import axios from 'axios';

const fetchUser = async (page) => {
  try {
    const response = await axios.get(`/users/api/v2/users?page=${page}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message || 'Error from axios/server');
  }
};

export { fetchUser };
