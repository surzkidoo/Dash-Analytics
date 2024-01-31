// api/transaction.js

import axios from 'axios';
import axiosInstance  from "../axiosInstance";


const fetchUser = async (page,query) => {
  try {
    const response = await axiosInstance.get(`/users/api/v2/users?page=${page}${query!=null&&'&search='+query}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message || 'Error from axios/server');
  }
};


const fetchSingleUser = async (id) => {
  try {
    console.log(id)
    const response = await axiosInstance.post(`/users/api/v3/adminSingleUser`,{id});
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message || 'Error from axios/server');
  }
};


const updateUser = async (formData) => {
  try {
    console.log('we are here',formData)
    const response = await axiosInstance.post(`/users/api/v3/adminUpdateUser`,formData);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message || 'Error from axios/server');
  }
};




export { fetchUser ,fetchSingleUser,updateUser};