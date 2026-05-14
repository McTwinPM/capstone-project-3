import { NavLink } from 'react-router-dom'
import "../styles/Navbar.css";

function Navbar({ setUser }) {
    function handleLogout() {
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <nav className="navbar">
            <NavLink to='/'>Initiative</NavLink>
            <NavLink to='/characters'>Character Vault</NavLink>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </nav>
    )
}

export default Navbar