import axios from "axios";
import { redirect } from "react-router-dom";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  headers: {
    post: {
      "Content-Type": "application/json",
    },
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (
      status === 401 ||
      status === 403
      // &&
      // error.response.data.detail ===
      //   "Non sono state immesse le credenziali di autenticazione."
    ) {
      return redirect("/login");
    }
    return Promise.reject(error);
  }
);

export default instance;
