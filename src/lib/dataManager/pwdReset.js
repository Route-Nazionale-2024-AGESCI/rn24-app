import axios from "../api";

export async function passwordReset({ codice, email }) {
  const response = await axios.post("auth/password-reset/", {
    email,
    agesci_id: codice,
  });
  return response.data;
}

export async function passwordGenerate({ username }) {
  const response = await axios.post("auth/password-generate/", {
    username,
  });
  return response.data;
}
