import axios from ".";

export const profile = async () => {
    const response = await axios.get('profile/');

    return response.data
};

export const login = async ({username, password}) => {
    const response = await axios.post("auth/login/", {
        username,
        password,
    });
    
    return response.data;
};
