import axios from "axios";
import { redirect } from "react-router-dom";

if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "/api/v1/";
} else {
  // TODO: leggere questo valore da .env, non inserito dentro git
  axios.defaults.baseURL = "https://rn24-dev.fly.dev/api/v1/";
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
      // TODO: potremmo mettere un messaggio di sessione scaduta?
      //window.location.href = '/login';
      //return;
      return redirect("/login");
    }
    //return Promise.reject(new Error(error));
    return Promise.reject(error);
  }
);

export default instance;
