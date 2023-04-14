import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import { createNewUser } from "../../utils/apiConfig";
import "./signup-modal.css";

function SignUpModal({ setShowSignUpModal }) {
  const [newUser, setNewUser] = useState({
    name: "",
    profession: "",
    about: "",
    email: "",
    password: "",
    profile_image: "",
    profile_background: "",
    wishlist: [],
    saved_courses: [],
    following: [],
    enrolled: []
  });

  const [bannerImage, setBannerImage] = useState("");

  const bannerImages = [
    "https://images.pexels.com/photos/7034068/pexels-photo-7034068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/5490266/pexels-photo-5490266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/7148057/pexels-photo-7148057.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/8412352/pexels-photo-8412352.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2960156/pexels-photo-2960156.jpeg?auto=compress&cs=tinysrgb&w=800",
  ];

  useEffect(() => {
    setBannerImage(
      (prev) =>
        (prev =
          bannerImages[
            [Math.round(Math.random() * (bannerImages.length - 1))]
          ])
    );
  }, []);

  const createUser = async () => {
    const { name, profession, about, email, password, profile_image, profile_background } = newUser;
    if (
      name.length != "" &&
      profession.length != "" &&
      about.length != "" &&
      profile_background.length != "" &&
      email.length != "" &&
      password.length != "" &&
      profile_image.length != ""
    ) {
      try {
        const res = await createNewUser(newUser);
        if (res.status === 201) {
          setShowSignUpModal(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="modal-background">
      <div className="signup-modal-container">
        <div className="modal-banner">
          <img src={bannerImage} alt="sign-up image" />
        </div>
        <div className="modal-container">
          <div className="modal-header">
            <h4>Time to sign up!</h4>
            <p>
              <i>
                Learn from expert professionals and join the largest online
                community for learners
              </i>
            </p>
          </div>
          <div className="modal-form-container">
            <form action="" className="modal-form">
              <input
                type="text"
                name="name"
                placeholder="Tell us your name"
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              <input
                type="text"
                name="profession"
                placeholder="Tell us your profession"
                onChange={(e) =>
                  setNewUser({ ...newUser, profession: e.target.value })
                }
              />
              <input
                type="text"
                name="about"
                placeholder="Tell us about yourself"
                onChange={(e) =>
                  setNewUser({ ...newUser, about: e.target.value })
                }
              />
              <input
                type="text"
                name="email"
                placeholder="Tell us your email"
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <input
                type="password"
                name="password"
                placeholder="Choose a password"
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
              <input
                type="text"
                name="profile-image"
                id="profile-image"
                placeholder="Url profile image from the web"
                onChange={(e) =>
                  setNewUser({ ...newUser, profile_image: e.target.value })
                }
              />
              <input
                type="text"
                name="profile_background"
                id="profile-background"
                placeholder="Url profile background from the web"
                onChange={(e) =>
                  setNewUser({ ...newUser, profile_background: e.target.value })
                }
              />
            </form>
          </div>
          <Button
            description="Sign Up!"
            handleModal={createUser}
            className="sign-up-button"
          />
          <div className="login-sugest">
            <p>Already have an account? Log in</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpModal;
