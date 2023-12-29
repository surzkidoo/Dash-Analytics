import axiosInstance  from "../axiosInstance";

export const signupUser = async (formData) => {
    try {
      const response = await axiosInstance.post('/users/api/v2/signup', formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Signup failed');
    }
  };


