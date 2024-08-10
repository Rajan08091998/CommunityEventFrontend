import { useLocation } from 'react-router-dom';
import '../styles/Navbar.css'
import { useEffect } from 'react';

function Navbar() {
    let isAuthorized = localStorage.getItem("isAuthorized") === 'true';
    useEffect(()=>{
        isAuthorized = localStorage.getItem("isAuthorized") === 'true';
        console.log(isAuthorized,'isAuthorized')
    },[isAuthorized])

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <a href="/" className="navbar-brand">CommEve</a>
                <ul className="navbar-menu">
                    {isAuthorized? (
                        <>
                            <li><a href="/" className="navbar-link">Home</a></li>
                            <li><a href="/events/create" className="navbar-link">Create Event</a></li>
                            <li><a href="/logout" className="navbar-link">Logout</a></li>
                        </>
                    ) : (
                        <>
                    
                    <li><a href="/login" className="navbar-link">Login</a></li>
                            <li><a href="/register" className="navbar-link">Register</a></li>
                        </>
                    )}

                </ul>
            </div>
        </nav>
    )
}

export default Navbar;