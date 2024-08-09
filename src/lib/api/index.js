import axios from "axios";

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
    if (status === 401 || status === 403) {
      console.log(error);
      localStorage.clear();
      window.location = "/login";
      return Promise.resolve();
    }
    return Promise.reject(error);
  }
);

export default instance;
