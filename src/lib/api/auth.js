import axios from ".";

export const login = async ({username, password}) => {
    const response = await axios.post("auth/login/", {
        username,
        password,
    });
    
    return response.data;
};
