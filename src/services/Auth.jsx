import axios from "axios";

const API_URL = "http://localhost:3001/";

const register = (email, password) => {
    return axios.post(API_URL + "users", {
        email,
        password,
        role: "user"
    });
};

const login = (email, password) => {
    return axios
        .get(API_URL + `users?email=${email}&password=${password}`)
        .then((response) => {
            if (response.data.length > 0) {
                const user = response.data[0];
                localStorage.setItem("user", JSON.stringify(user));
                return user;
            } else {
                throw new Error("Invalid credentials");
            }
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const Auth = {
    register,
    login,
    logout,
    getCurrentUser,
}

export default Auth;