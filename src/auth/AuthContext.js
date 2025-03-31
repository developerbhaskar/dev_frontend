import { createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async ({ email, password }) => {
        const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
    };

    const register = async ({ name, email, password }) => {
        const response = await axios.post("/api/auth/register", { name, email, password });
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
    };
    const logout = () => {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
