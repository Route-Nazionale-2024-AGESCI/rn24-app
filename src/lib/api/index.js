import axios from "axios";


const instance = axios.create({
    baseURL: 'https://rn24-dev.fly.dev/api/v1/',
    headers: {
        post: {
            'Content-Type': 'application/json'
        }
    }
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
      if (error.response?.status === 401) {
      // TODO: potremmo mettere un messaggio di sessione scaduta?
      window.location.href = '/';
      }
  }
);

export default instance;
