import axiosInstance  from "../axiosInstance";

export const signInUser = async (formData) => {
    try {
      const response = await axiosInstance.post('/users/api/v2/login', formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Signup failed');
    }
  };


