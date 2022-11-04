import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../components/images/container 1.png";
import "./Navbar.css";
import { navItems } from "./NavItems";
import Dropdown from "./Dropdown";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleClick = () => {
    fetch(`/clients/${user.id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setUser(null);
        navigate("/signup");
        toast.success("Logged out successfully");
      }
    });
  };

  const [dropdown, setDropdown] = useState(false);
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          {" "}
          <img src={logo} alt="container" />
          <Link to="/" className="navbar-logo">
            Storage-Center
          </Link>
        </div>
       
        <ul className="nav-items">
          {navItems.map((item) => {
            if (item.title === "More") {
              return (
                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => setDropdown(true)}
                  onMouseLeave={() => setDropdown(false)}
                >
                  <Link to={item.path}>{item.title}</Link>
                  {dropdown && <Dropdown />}
                </li>
              );
            }
            return (
              <li key={item.id} className={item.cName}>
                <Link to={item.path}>{item.title}</Link>
              </li>
            );
          })}
          <div className="deps">
            <li>
              {user ? (
                <Link to="/admin" className="logout">
                  Admin
                </Link>
              ) : null}
            </li>
          
            <li>
              {user ? null : (
                <Link to="/signup" className="logout">
                  Signup
                </Link>
              )}
            </li>
            <li>
              {user ? (
                <button type="submit" onClick={handleClick} className="logout">
                  Logout
                </button>
              ) : null}
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
