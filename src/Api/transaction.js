import axios from 'axios';
import axiosInstance  from "../axiosInstance";


const fetchTransaction = async (page, transactionType) => {
  try {
    const response = await axiosInstance.get(`/trx/api/v2/transactions?page=${page}&transactionType=${transactionType}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message || 'Error from axios/server');
  }
};

export { fetchTransaction };
