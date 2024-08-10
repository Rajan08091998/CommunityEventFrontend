import { useState } from "react"
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";
// import Register from "../pages/Register";

function LoginAndRegisterForm({ route, method }) {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setloading] = useState(false);

    const navigate = useNavigate();

    const name = method === 'login' ? "Login" : "Register";


    const handleSubmit = async (e) => {
        setloading(true);
        e.preventDefault();
        try {
            console.log(method)
            const res = await api.post(route, { username: username, password: password });
            if (method === 'login') {
                console.log(res, res.data.access, res.data.refresh)
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                console.log('login')
                navigate('/login')
            }

        } catch (error) {
            alert(error);

        } finally {
            setloading(false);
        }

    }



    return (
        <form onSubmit={handleSubmit}>
            <h1>{name}</h1>
            <input
                required
                type="text"
                className="form-input"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="User Name"
            />
            <br />
            <input
                required
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {loading && <LoadingIndicator/>}
            <button className="form-button" type='submit'>
                {name}
            </button>
            <br />
            {/* <button onClick={navigate('/register')}>Want to register?</button> */}
            {method === 'login' &&
                <a href="/register">New to platform?</a>
            }
        </form>
    )

}

export default LoginAndRegisterForm;

