import axios from ".";

export const list = async () => {
    const response = await axios.get('locations/');

    return response.data
};
