import axios from "axios";

const API_URL = "http://localhost:3001/";

const register = (email, password) => {
    return axios.post(API_URL + "users", {
        email,
        password,
        role: "user"
    });
};

const login = async (email, password) => {
    const response = await axios.get(
        API_URL + `users?email=${email}&password=${password}`
    );

    if (response.data.length === 0) {
        throw new Error("Invalid credentials");
    }

    return response.data[0];
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export default { register, login, logout, getCurrentUser };