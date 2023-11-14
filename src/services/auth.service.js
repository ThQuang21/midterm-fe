import axios from "axios";

const API_URL = "https://midterm-be.vercel.app/";

const signin = (email, password) => {
  return axios
    .post(API_URL + "auth/signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem('email', email);
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    });
};

const getUserByEmail = async () => {
  let currentUser = localStorage.getItem('email')
  let token = localStorage.getItem('token');
  const response =  await axios.get(API_URL + "user/" + `${currentUser}`, {
    headers: {"Authorization": `Bearer ${token}`}
  });

  if (response.status === 200) {
    return response.data;
  }
};

const signup = async (formData) => {
  try {
    const response = await axios.post(API_URL + "auth/signup", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const AuthService = {
  signin,
  signup,
  getUserByEmail
}

export default AuthService;