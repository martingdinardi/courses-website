import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import "./logout-modal.css";
import Button from "../Button/Button";

function LogoutModal() {
  const { setShowLogoutModal, setIsLogged, setSavedCoursesId } = useContext(UserContext);

  const handleCancelButton = () => {
    setShowLogoutModal(false)
  }

  const handleLogoutButton = () => {
    setShowLogoutModal(false)
    setIsLogged(false)
    setSavedCoursesId([])
    localStorage.removeItem("user")
    localStorage.removeItem("wishlist")
    localStorage.removeItem("saved_courses")
  }

  return (
    <div className="modal-background">
      <div className="logout-modal">
        <p>Are you sure, you want to logout?</p>
        <div className="logout-modal-buttons">
          <Button description="Cancel" handleModal={handleCancelButton} />
          <Button description="Logout" handleModal={handleLogoutButton}/>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
