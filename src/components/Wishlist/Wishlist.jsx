import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import WishlistItem from "../WishlistItem/WishlistItem";
import { getSuggestCourses } from "../../utils/apiConfig";
import Button from "../Button/Button";
import "./wishlist.css";

function Wishlist({ arr }) {
  const { setShowWishlist } = useContext(UserContext);
  const [suggestCourses, setSuggestCourses] = useState([]);

  const closeWishlist = () => {
    setShowWishlist(false);
  };

  const fetchSuggestCourses = async () => {
    const { data } = await getSuggestCourses();
    await setSuggestCourses(data);
  };

  const calculateTotalPrice = (arr) => {
    let totalPrice = 0;
    // arr ? totalPrice+= Number(arr[1].price) : null
    if (arr.length) {
      for (let i = 0; i < arr.length; i++) {
        totalPrice += Number(arr[i].price);
      }
    }
    return totalPrice;
  };

  useEffect(() => {
    try {
      fetchSuggestCourses();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <img
          src="https://www.svgrepo.com/show/305186/close.svg"
          alt="wishlist-close-icon"
          className="wishlist_close_img"
          onClick={closeWishlist}
        />
      </div>
      {arr.length ? (
        <>
          <div className="wishlist-title">
            <h3>Your Cart</h3>
            <img
              src="https://www.svgrepo.com/show/143534/shopping-cart-full.svg"
              alt="wishlist-icon"
              className="wishlist_img"
            />
          </div>
          <div className="wishlist-with-elements">
            <div className="wishlist-top-content">
              <div className="wishlist-courses">
                {arr.map((course) => {
                  return (
                    <Link to={`/course/${course.id}`} key={course.description}>
                      <WishlistItem course={course} key={course.description} />
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="wishlist-bottom-content">
              <hr />
              <div className="wishlist-total-price">
                  <small>USD</small>
                <b>
                  {calculateTotalPrice(arr)}
                </b>
              </div>
              <div className="wishlist-confirm-clear-buttons">
                <Button description={"Go to checkout"} icon={"https://www.svgrepo.com/show/37077/credit-card.svg"} className={"wishlist-confirm-button"}/>
                <Button description={"Clear all"} icon={"https://www.svgrepo.com/show/160079/shopping-cart-empty-side-view.svg"}/>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="wishlist-empty">
            <div className="wishlist-empty-header">
              <img
                src="https://www.svgrepo.com/show/160079/shopping-cart-empty-side-view.svg"
                alt="wishlist-icon"
                className="wishlist_img"
              />
              <h2>Your cart is empty</h2>
              <h4>
                But dont worry! here are courses you might be interested in:
              </h4>
            </div>
            <div className="wishlist-empty-courses">
              {suggestCourses.map((course) => {
                return (
                  <Link to={`/course/${course.id}`} key={course.description}>
                    <WishlistItem course={course} key={course.description} />
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Wishlist;
