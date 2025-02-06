import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/auth.service";
import "./Header.css";

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate("/login"); 
        } catch (error) {
            console.error("Logout failed:", error.message);
        }
    };

    return (
        <header className="navbar">
            <div className="logo">
                📝 To-Do App
            </div>
            <nav className="nav-links">
                <NavLink to="/" className="nav-link">Home</NavLink>
                <NavLink to="/todos" className="nav-link">Todos</NavLink>
            </nav>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
        </header>
    );
};

export default Header;
