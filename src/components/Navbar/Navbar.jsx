import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { UserContext } from "../../context/UserContext";
import Button from "../Button/Button";
import "./navbar.css";
import SignUpModal from "../SignUpModal/SignUpModal";
import LoginModal from "../LoginModal/LoginModal";
import { Link, useLocation } from "react-router-dom";
import UserMenu from "../UserMenu/UserMenu";
import Wishlist from "../../components/Wishlist/Wishlist";
import { fetchWishlist } from "../../hooks/fetchWishlist";
import CategoriesModal from "../CategoriesModal/CategoriesModal";

function Navbar({ links }) {
  const {
    isLogged,
    showLoginModal,
    setShowLoginModal,
    strUser,
    setShowLogoutModal,
    wishlist,
    setWishlist,
    wishlistId,
    showWishlist,
    setShowWishlist,
    savedCoursesId,
  } = useContext(UserContext);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const user = strUser ? JSON.parse(strUser) : "";
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [visibleCategoriesModal, setVisibleCategoriesModal] = useState(false);

  const location = useLocation();
  const pagePath = location.pathname;

  const handleLoginModal = () => {
    setShowLoginModal(true);
  };
  const handleSignUpModal = () => {
    setShowSignUpModal(true);
  };

  const handleClickOutside = (e) => {
    if (e.target.className === "modal-background") {
      setShowSignUpModal(false);
      setShowLoginModal(false);
      setShowLogoutModal(false);
    }
  };

  const handleClickOutsideUserMenu = (e) => {
    if (
      e.target.className !== "usercard_img" &&
      e.target.className !== "user-menu-logout"
    ) {
      setShowUserMenu(false);
    }
  };

  const handleUserMenu = () => {
    setShowUserMenu(true);
  };

  const handleShowWishlist = () => {
    setShowWishlist(true);
  };

  const handleCourses = () => {
    fetchWishlist(wishlistId, setWishlist);
  };

  const handleShowCategoriesModal = () => {
    setVisibleCategoriesModal(true);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideUserMenu);
    return () => {
      document.removeEventListener("click", handleClickOutsideUserMenu);
    };
  }, []);

  useEffect(() => {
    handleCourses();
  }, [wishlistId]);

  useEffect(() => {
    setVisibleCategoriesModal(false);
  }, [pagePath]);

  return (
    <>
      {showUserMenu ? <UserMenu /> : ""}
      <div
        className="navbar"
        style={{ zIndex: visibleCategoriesModal ? "99" : "" }}
      >
        <div className="navbar-header">
          <div className="navbar__logo">
            <Link to="/">
              <img src={logo} alt="App Logo" />
            </Link>
          </div>

          <div className="navbar__links">
            <ul>
              {links
                ? links.map((link, i) => {
                    return (
                      <li
                        key={link}
                        onMouseOver={
                          link === "Categories"
                            ? handleShowCategoriesModal
                            : null
                        }
                        style={{
                          marginRight: i != links.length - 1 ? "20px" : "",
                        }}
                        className={link === "PRO" ? "pro-link" : ""}
                      >
                        {link}
                      </li>
                    );
                  })
                : ""}
            </ul>
          </div>
        </div>

        {isLogged ? (
          <div className="navbar_usercard_img_container">
            {wishlistId.length > 0 ? (
              <img
                src="https://www.svgrepo.com/show/143534/shopping-cart-full.svg"
                alt="wishlist-icon"
                className="wishlist_img"
                onClick={handleShowWishlist}
              />
            ) : (
              <img
                src="https://www.svgrepo.com/show/160079/shopping-cart-empty-side-view.svg"
                alt="wishlist-icon"
                className="wishlist_img"
                onClick={handleShowWishlist}
              />
            )}
            <Link to="/saved-courses">
              {savedCoursesId.length ? (
                <img
                  src="https://www.svgrepo.com/show/39500/heart.svg"
                  alt="Saved Courses Icon"
                  className="saved_courses_img"
                />
              ) : (
                <img
                  src="https://www.svgrepo.com/show/53700/heart.svg"
                  alt="Saved Courses Icon"
                  className="saved_courses_img"
                />
              )}
            </Link>

            <img
              src={user.profile_image}
              alt="User Profile Image"
              className="usercard_img"
              onClick={handleUserMenu}
            />
          </div>
        ) : (
          <div className="navbar__buttons">
            <Button
              className="navbar_buttons_login"
              description="Log in"
              handleModal={handleLoginModal}
            />
            <Button
              className="navbar_buttons_signup"
              description="Sign Up"
              handleModal={handleSignUpModal}
            />
            {showSignUpModal ? (
              <SignUpModal setShowSignUpModal={setShowSignUpModal} />
            ) : (
              ""
            )}
            {showLoginModal ? <LoginModal /> : ""}
          </div>
        )}
      </div>
      <div
        id="responsive-navbar"
        className="navbar"
        style={{ zIndex: visibleCategoriesModal ? "99" : "" }}
      >
        <div className="navbar-header">
          <div 
          className="navbar__links">
            <ul>
              {links
                ? links.map((link, i) => {
                    return (
                      <li
                        key={link}
                        onMouseOver={
                          link === "Categories"
                            ? handleShowCategoriesModal
                            : null
                        }
                        style={{
                          marginRight: i != links.length - 1 ? "20px" : "",
                        }}
                        className={link === "PRO" ? "pro-link" : ""}
                      >
                        {link}
                      </li>
                    );
                  })
                : ""}
            </ul>
          </div>
        </div>
      </div>
      {showWishlist ? (
        <Wishlist arr={wishlistId[0] !== "" ? wishlist : []} />
      ) : null}
      {visibleCategoriesModal ? (
        <CategoriesModal
          visibleCategoriesModal={visibleCategoriesModal}
          setVisibleCategoriesModal={setVisibleCategoriesModal}
        />
      ) : null}
    </>
  );
}

export default Navbar;
