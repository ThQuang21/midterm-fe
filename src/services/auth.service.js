import axios from "axios";

const API_URL = "http://localhost:8080/";

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

const AuthService = {
  signin,
  getUserByEmail
}

export default AuthService;