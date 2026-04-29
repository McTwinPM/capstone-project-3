import { NavLink } from 'react-router-dom'

function Navbar({ setUser }) {
    function handleLogout() {
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <nav>
            <NavLink to='/'>Initiative</NavLink>
            <NavLink to='/characters'>Character Vault</NavLink>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    )
}

export default Navbar