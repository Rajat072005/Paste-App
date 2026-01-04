
import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styling/navbar.css'
import { isLoggedIn ,removeToken } from '../utils/auth'
import { useNavigate } from 'react-router-dom'





const Navbar = ({ isOpen, toggleNavbar }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
  removeToken();
  toggleNavbar();
  navigate("/login");
  

}
  return (
    <>
      <div className={`nav-overlay ${isOpen ? "show" : ""}`} onClick={toggleNavbar}></div>

      <div className={`Navbar ${isOpen ? 'open' : ''}`}>
        
        <button className="close-btn" onClick={toggleNavbar}>✖</button>

        <nav>
          <NavLink to="/" onClick={toggleNavbar}>Home</NavLink>
          <NavLink to="/pastes" onClick={toggleNavbar}>All Pastes</NavLink>
          <NavLink to="/contact" onClick={toggleNavbar}>Contact Us</NavLink>
          {isLoggedIn() ? (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <NavLink to="/login" onClick={toggleNavbar}>
              Login
            </NavLink>
          )}
        </nav>

      </div>
    </>
  )
}

export default Navbar

