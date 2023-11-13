import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

const signin = (email, password) => {
  return axios
    .post(API_URL + "signin", {
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

const AuthService = {
  signin,
}

export default AuthService;