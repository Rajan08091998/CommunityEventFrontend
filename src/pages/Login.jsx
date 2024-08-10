import LoginAndRegisterForm from "../components/Form";
import Navbar from "../components/Navbar";


function Login() {
    return (
        <>
            <Navbar />
            <LoginAndRegisterForm route='/api/v1/web-auth/' method='login' />
        </>
    )
}

export default Login;   