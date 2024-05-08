import axios from "axios";
import { redirect } from "react-router-dom";

const instance = axios.create({
  baseURL: "https://rn24-dev.fly.dev/api/v1/",
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
    return Promise.reject(error);
  }
);

export default instance;
