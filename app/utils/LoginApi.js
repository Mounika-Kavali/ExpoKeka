import axios from 'axios';

const BASE_URL = 'https://udaykiran15.pythonanywhere.com/api/'; 

const loginApi = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, payload);

    // Assuming your API returns data with a token
    const { token, user } = response.data;

    return { success: true, token, user };
  } catch (error) {
    console.error('Login API error:', error);

    // You might want to handle different error scenarios and return appropriate data
    return { success: false, error: 'Login failed. Please try again.' };
  }
};

export { loginApi };
