import LoginAndRegisterForm from "../components/Form";
import Navbar from "../components/Navbar";


function Register() {
    return (
        <>
            <Navbar />
            <LoginAndRegisterForm route='/api/v1/users/' method='register' />

        </>
    )

}

export default Register;