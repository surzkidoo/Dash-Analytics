// api/transaction.js

import axios from 'axios';
import axiosInstance  from "../axiosInstance";


const fetchUser = async (page) => {
  try {
    const response = await axiosInstance.get(`/users/api/v2/users?page=${page}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message || 'Error from axios/server');
  }
};

export { fetchUser };
