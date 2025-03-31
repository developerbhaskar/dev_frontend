import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../auth/AuthContext";
import "./Auth.css"; // Import the styling

const Auth = () => {
    const { login, register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [userData, setUserData] = useState({ name: "", email: "", password: "" });

    const handleAuth = async () => {
        if (isLogin) {
            await login({ email: userData.email, password: userData.password });
        } else {
            await register(userData);
        }
        navigate("/dashboard");
    };

    return (
        <div className="auth-container">
            <div className={`auth-box ${isLogin ? "flip-login" : "flip-register"}`}>
                <div className="form-front">
                    <h2 className="auth-title">Login to Your Account</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        className="input-field"
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="input-field"
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    />
                    <button className="auth-button" onClick={handleAuth}>
                        Login
                    </button>
                    <p className="auth-footer">
                        Don't have an account?{" "}
                        <span className="toggle-link" onClick={() => setIsLogin(false)}>
                            Register
                        </span>
                    </p>
                </div>

                <div className="form-back">
                    <h2 className="auth-title">Create an Account</h2>
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="input-field"
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="input-field"
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="input-field"
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    />
                    <button className="auth-button" onClick={handleAuth}>
                        Register
                    </button>
                    <p className="auth-footer">
                        Already have an account?{" "}
                        <span className="toggle-link" onClick={() => setIsLogin(true)}>
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
