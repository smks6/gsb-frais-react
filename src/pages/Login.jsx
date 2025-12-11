import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../style/Login.css";

export default function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { loginUser } = useAuth();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser(login, password);
            navigate('/dashboard');
        } catch {
            alert('Echec de connexion');
        }
    }
    return (
        <div className="login-page">
            <div className="login-container">
                <h1>Connexion</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div>
                        <label>Login : </label>
                        <input
                            type="text"
                            name="login"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Mot de passe : </label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Se connecter</button>
                </form>
            </div>
        </div>
    )
}