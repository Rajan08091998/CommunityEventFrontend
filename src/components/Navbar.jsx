import { useLocation } from 'react-router-dom';
import '../styles/Navbar.css'
import { useEffect, useState } from 'react';

function Navbar() {
    let isAuthorized = localStorage.getItem("isAuthorized") === 'true';
    useEffect(()=>{
        isAuthorized = localStorage.getItem("isAuthorized") === 'true';
        console.log(isAuthorized,'isAuthorized')
    },[isAuthorized])
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <a href="/" className="navbar-brand">Eventure</a>
                <div className="hamburger" onClick={toggleMenu}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                    {isAuthorized ? (
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