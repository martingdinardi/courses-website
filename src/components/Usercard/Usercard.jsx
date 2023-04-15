import React, {useState, useContext} from "react";
import "./usercard.css";
import { UserContext } from "../../context/UserContext";
import instagramIcon from "../../assets/instagramIcon.svg";
import linkedinIcon from "../../assets/linkedinIcon.svg";
import twitterIcon from "../../assets/twitterIcon.svg";
import blissIcon from "../../assets/logo.png";
import Button from "../../components/Button/Button";
import { Link, useLocation } from "react-router-dom";

function Usercard({user}) {

  let {strUser} = useContext(UserContext);
  const loggedUser = strUser ? JSON.parse(strUser) : "";
  const location = useLocation();
  const pagePath = location.pathname.split("/")[1];

  return (
    <>
      <div className="course-page-course-owner">
                <div className="course-page-course-owner-img">
                  <img
                    src={user.profile_image}
                    alt="Course Teacher Profile Image"
                  />
                </div>
                <div className="course-page-course-owner-info">
                  <Link to={`/user/${user.id}`}>
                  <h2 className={pagePath === "course" ? "course-page-owner-info-text" : ""}>{user.name}</h2>
                  </Link>
                  <p className={pagePath === "course" ? "course-page-owner-info-text" : ""}>{user.profession}</p>
                  <div className={`course-page-course-owner-info-socialmedia ${pagePath === "profile" || pagePath === "user"? "course-page-owner-info-icon" : ""}`}>
                    { loggedUser ?
                      user.email === loggedUser.email ? "" : <Button description="+Follow" />
                      : ""
                    }
                    <div className="course-page-course-owner-info-socialmedia-icons">
                    <img src={blissIcon} alt="Bliss Logo" />
                    <img src={twitterIcon} alt="Twitter Logo" />
                    <img src={instagramIcon} alt="Instagram Logo" />
                    <img src={linkedinIcon} alt="Linkedin Logo" />
                    </div>
                  </div>
                </div>
              </div>
    </>
  );
}

export default Usercard;
