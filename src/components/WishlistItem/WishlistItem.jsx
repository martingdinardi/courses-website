import React from "react";

function WishlistItem({course}) {
  return (
    <>
      <div className="wishlist__course" key={course.description}>
        <div className="wishlist-course__img">
          <img src={course.images[0]} alt="Wishlist Course Image" />
        </div>
        <div className="wishlist-course__title">
          <p>{course.title.slice(0, 80)}</p>
        </div>
        <div className="wishlist-course_price">
          <p><small>USD</small><b>{course.price}</b></p>
        </div>
      </div>
    </>
  );
}

export default WishlistItem;
