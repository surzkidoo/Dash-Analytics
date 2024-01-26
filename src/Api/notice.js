import axios  from "axios";

export const getNotice = async () => {
    try {
      const response = await axios.get(` http://localhost:5000/notice/api/v3/getNotice`);
      console.log(response.data);

      return response.data;
    } catch (error) {
       console.error(error);
    throw new Error(error.message || 'Getting Notice failed');
    }
  };

  export const createNotice = async (formData) => {
    try {
      const response = await axios.post(`http://localhost:5000/notice/api/v3/CreateNotice`,
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

