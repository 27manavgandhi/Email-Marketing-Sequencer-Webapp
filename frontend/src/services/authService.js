import axios from "axios";

const BASE_URL = !import.meta.env.PROD ? "http://localhost:3000/api/auth" : "/api/auth";


// for new user registration
export const registerUser = async (userData) => {
    try {
        const { data } = await axios.post(BASE_URL + "/register", userData);
    } catch (error) {
        throw error.response.data.msg
    }
}


// for user login
export const loginUser = async (userData) => {
    try {
        const { data } = await axios.post(BASE_URL + "/login", userData);
        return data;
    } catch (error) {
        throw error.response.data.msg;
    }
}