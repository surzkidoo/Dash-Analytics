// api/transaction.js

import axios from 'axios';

const fetchTransaction = async (page, transactionType) => {
  try {
    const response = await axios.get(`http://localhost:3000/transactions?page=${page}&transactionType=${transactionType}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message || 'Error from axios/server');
  }
};

export { fetchTransaction };
