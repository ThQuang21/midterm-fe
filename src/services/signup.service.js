import axios from 'axios';

const API_URL = "http://localhost:8080/auth/";

const signup = async (formData) => {
  try {
    const response = await axios.post(API_URL + "signup", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default signup;
