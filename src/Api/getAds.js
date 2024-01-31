import axios from "axios";
import axiosInstance  from "../axiosInstance";

export const fetchData = async (page,adType) => {
    try {
      const response = await axiosInstance.get(`/studio/api/v3/requestAdAdmin?page=${page}&adType=${adType}`);
      console.log(response.data);

      return response.data;
    } catch (error) {
       console.error(error);
    throw new Error(error.message || 'Getting Ad failed');
    }
  };

  export const changeStatus = async (formData) => {
    try {
      const response = await axiosInstance.post(`/studio/api/v3/changeStatus`,formData);
      console.log(response.data);
      return response.data;
    } catch (error) {
       console.error(error);

    throw new Error(error.message || 'Changing Ad Status failed');
    }
  };

