import axios from ".";

export const list = async () => {
    const response = await axios.get('events/');

    return response.data
};

export const registrationList = async () => {
    const response = await axios.get('events/registrations/');

    return response.data
};
