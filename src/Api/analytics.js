import axiosInstance  from "../axiosInstance";

export const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/analytics/api/v2/analytics');
      return response.data;
    } catch (error) {
       console.error(error);  // Log the error message
    throw new Error(error.message || 'Sign-in failed');
    }
  };
