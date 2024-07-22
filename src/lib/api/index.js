import axios from "axios";
import { redirect } from "react-router-dom";

if (process.env.NODE_ENV === "production") {
  // axios.defaults.baseURL = "/api/v1/";
  axios.defaults.baseURL = "https://rn24-app-dev.agesci.it/api/v1/";
} else {
  // TODO: leggere questo valore da .env, non inserito dentro git
  axios.defaults.baseURL = "https://rn24-app-dev.agesci.it/api/v1/";
}

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
      (status === 403 &&
        error.response.data.detail ===
          "Non sono state immesse le credenziali di autenticazione.")
    ) {
      return redirect("/login");
    }
    return Promise.reject(error);
  }
);

export default instance;
