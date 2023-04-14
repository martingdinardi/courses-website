import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import "../UserMenu/user-menu.css";
import { Link } from "react-router-dom";
import LogoutModal from "../LogoutModal/LogoutModal";

function UserMenu() {

  const { showLogoutModal, setShowLogoutModal } = useContext(UserContext);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  return (
    <>
      {showLogoutModal ? <LogoutModal /> : ""}
      <div className="user-menu">
        <ul className="user-menu-list">
          <Link to="/profile">
            <li>
              <img
                src="https://www.svgrepo.com/show/333287/profile.svg"
                alt="Profile Icon"
              />{" "}
              Profile
            </li>
          </Link>
          <Link to="/settings">
            <li>
              <img
                src="https://www.svgrepo.com/show/11478/settings.svg"
                alt="Settings Icon"
              />
              Settings
            </li>
          </Link>
          <li className="user-menu-logout" onClick={handleLogout}>
            <img
              src="https://www.svgrepo.com/show/151971/logout.svg"
              alt="Logout Icon"
            />
            Logout
          </li>
        </ul>
      </div>
    </>
  );
}

export default UserMenu;
