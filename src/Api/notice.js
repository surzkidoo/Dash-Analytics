import axios  from "axios";
import axiosInstance  from "../axiosInstance";


export const getNotice = async () => {
    try {
      const response = await axiosInstance.get(`/notice/api/v3/getNotice`);
      console.log(response.data);

      return response.data;
    } catch (error) {
       console.error(error);
    throw new Error(error.message || 'Getting Notice failed');
    }
  };

  export const createNotice = async (formData) => {
    try {
      const response = await axiosInstance.post(`/notice/api/v3/CreateNotice`,
      formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }},);
      console.log(response.data);
      return response.data;
    } catch (error) {
       console.error(error);

    throw new Error(error.message || 'Uploading Notice failed');
    }
  };

