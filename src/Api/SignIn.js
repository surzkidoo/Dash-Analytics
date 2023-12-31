import axiosInstance  from "../axiosInstance";

export const signInUser = async (formData) => {
    try {
      const response = await axiosInstance.post('/users/api/v2/login', formData);
      return response.data;
    } catch (error) {
       console.error(error);  // Log the error message
    throw new Error(error.message || 'Sign-in failed');
    }
  };


