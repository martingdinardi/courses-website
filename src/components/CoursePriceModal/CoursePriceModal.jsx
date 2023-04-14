import { React, useState, useEffect } from "react";
import Button from "../Button/Button";
import "./course-price-modal.css";

function CoursePriceModal({ course, view, view2, handlePriceModal, user, isInWishlist }) {
  const [display, setDisplay] = useState(false);

  const handleModal = () => {
    if(window.pageYOffset === 0){
      setDisplay(false)
    }
    else if (view === true) {
      setDisplay(false);
    } else if (view === false && view2 === true) {
      setDisplay(true);
    } else if (view2 === false) {
      setDisplay(false);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", handleModal);
    return () => {
      document.removeEventListener("scroll", handleModal);
    };
  }, [handleModal]);
  
  return (
    <>
      {course && display ? (
        <div className="course-price-modal" onClick={handlePriceModal}>
          <div className={display ? "course-page-price" : ""}>
            <div className="course-page-price-elements">
              <h1>{course.price} USD</h1>
              <p>
                75% Disc. <span>{course.price * 4} USD</span>
              </p>
              <small>This offer ends in 7 days</small>
              {user ? (
                course.owner.email === JSON.parse(user).email ? (
                  ""
                ) : (
                  <div className="course-page-price-button">
                    {
                      isInWishlist ? <Button description="In cart" className="in-wishlist-button" icon={"https://www.svgrepo.com/show/143534/shopping-cart-full.svg"}/> : <Button description="+ Add to cart" /> 
                    }
                    
                  </div>
                )
              ) : (
                <div className="course-page-price-button">
                  <Button description="+ Add to cart" />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default CoursePriceModal;
