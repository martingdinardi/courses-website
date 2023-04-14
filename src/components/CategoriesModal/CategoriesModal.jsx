import React, { useEffect } from "react";
import "./categories-modal.css";
import { categories } from "../../utils/categories";
import { Link } from "react-router-dom";

function CategoriesModal({visibleCategoriesModal, setVisibleCategoriesModal}) {

  const handleHideCategoriesModal = () => {
     setVisibleCategoriesModal(false)
  }

  return (
    <div className="categories-modal--container" onMouseLeave={handleHideCategoriesModal}>
      <div className="categories-modal--elements">
        <div className="categories-modal--categories">
          <div className="categories-modal--course-categories">
            <h2>Categories</h2>
            <ul>
              {categories.map((category) => {
                return (
                  <li key={category}>
                    <Link to={`/category/${category}`} key={category}>
                      {category}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="categories-modal--other-categories">
            <ul>
              <li key={"openCourses"}>
                <Link to={`/category/open-courses`} key={"openCourses"}>
                  Open Courses
                </Link>
              </li>

              <li key={"giftcards"}>
                <Link to={`/category/giftcards`} key={"giftcards"}>
                  Giftcards
                </Link>
              </li>

              <li key={"blissLive"}>
                <Link to={`/category/bliss Live`} key={"blissLive"}>
                  Bliss Live
                </Link>
              </li>

              <li>
                <Link to={`/category/blog`} key={"blog"}>
                  Blog
                </Link>
              </li>
              <li className="pro-link">
                <Link to={`/category/pro`} key={"pro"}>
                  PRO
                </Link>
              </li>
            </ul>
          </div>
        </div>

       
          <div className="categories-modal--goesgreen-container">
            <div
              className="categories-modal--goesgreen-course"
              style={{
                backgroundImage: `url(https://images.pexels.com/photos/7656127/pexels-photo-7656127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
              }}
            >
              <div className="categories-modal--goesgreen-header">
                <h2>#BlissGoesGreen</h2>
                <img src="https://www.svgrepo.com/show/352392/recycle.svg" />
              </div>
              <div className="categories-modal--goesgreen-footer">
                <h2>be part</h2>
                <img src="https://www.svgrepo.com/show/335930/right.svg" />
              </div>
            </div>
          </div>
     
      </div>
    </div>
  );
}

export default CategoriesModal;

//${randomCourse.images[1]}
