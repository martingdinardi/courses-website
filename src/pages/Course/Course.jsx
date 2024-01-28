import React, { useEffect, useState, useContext } from "react";
import Layout from "../../components/Layout/Layout";
import {
  addToWishlist,
  getOneCourse,
  getUser,
  saveCourse,
} from "../../utils/apiConfig";
import { Link, useLocation } from "react-router-dom";
import "./course.css";
import audioIcon from "../../assets/audio.svg";
import subtitlesIcon from "../../assets/subtitles.svg";
import { stars } from "../../utils/rating-stars";
import DotLoader from "react-spinners/DotLoader";
import { UserContext } from "../../context/UserContext";
import Usercard from "../../components/Usercard/Usercard";
import Button from "../../components/Button/Button";
import CoursePriceModal from "../../components/CoursePriceModal/CoursePriceModal";
import SimilarCourses from "../../components/SimilarCourses/SimilarCourses";
import { useInView } from "react-intersection-observer";
import { courses, users } from "../../../db.json";

function Course() {
  const location = useLocation();
  const course_id = location.pathname.split("/")[2];
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const [ref2, inView2] = useInView();

  const {
    theme,
    isLogged,
    strUser,
    localStorageWishlist,
    wishlistId,
    setWishlistId,
    setShowWishlist,
    localStorageSavedCourses,
    savedCoursesId,
    setSavedCoursesId,
  } = useContext(UserContext);

  const [course, setCourse] = useState();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const isInWishlist = wishlistId.includes(course_id);

  const handleLoading = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  };

  const fetchCourse = async () => {
    try {
      const course = await courses.find(
        (course) => course.id === Number(course_id)
      );
      console.log(typeof course_id, course);
      await setCourse(course);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async (course) => {
    if (course) {
      try {
        const { data } = await getUser(course.owner.id);
        await setUser(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleAddToWhislist = async () => {
    if (isLogged) {
      await localStorage.setItem("wishlist", [
        ...localStorageWishlist,
        course_id,
      ]);
      await addToWishlist(JSON.parse(strUser).id, [
        ...localStorageWishlist,
        course_id,
      ]);
      await setWishlistId(
        wishlistId.length > 0 ? [...wishlistId, course_id] : [course_id]
      );
      setShowWishlist(true);
    }
  };

  const removeFromWishlist = () => {
    const wishlistWithoutDeletedCourse = wishlistId.filter(
      (course) => course != course_id
    );
    setWishlistId(wishlistWithoutDeletedCourse);
    localStorage.setItem("wishlist", wishlistWithoutDeletedCourse);
    addToWishlist(JSON.parse(strUser).id, wishlistWithoutDeletedCourse);
  };

  const handleSaveCourses = async () => {
    if (isLogged) {
      await localStorage.setItem("saved_courses", [
        ...savedCoursesId,
        course_id,
      ]);
      await saveCourse(JSON.parse(strUser).id, [...savedCoursesId, course_id]);
      await setSavedCoursesId(
        savedCoursesId.length > 0 ? [...savedCoursesId, course_id] : [course_id]
      );
    }
  };

  const removeFromSavedCourses = () => {
    const savedCoursesWithoutDeletedCourse = savedCoursesId.filter(
      (course) => course != course_id
    );
    setSavedCoursesId(savedCoursesWithoutDeletedCourse);
    localStorage.setItem("saved_courses", savedCoursesWithoutDeletedCourse);
    saveCourse(JSON.parse(strUser).id, savedCoursesWithoutDeletedCourse);
  };

  useEffect(() => {
    setShowWishlist(false);
  }, []);

  useEffect(() => {
    fetchCourse();
    window.scrollTo({ top: 0 });
  }, [course_id]);

  useEffect(() => {
    fetchUser(course);
    document.title = course ? `Bliss - ${course.title}` : "Bliss";
  }, [course]);

  console.log();

  return (
    <>
      <Layout>
        <div className="course-page-container">
          {course ? (
            <>
              <div className="course-page-info">
                <div className="course-page-header">
                  <div className="course-page-header__title-and-saved_courses">
                    <div className="course-page-header-title">
                      <h2>{course.title}</h2>
                    </div>

                    {strUser ? (
                      user.id ===
                      Number(
                        JSON.parse(strUser).id
                      ) ? null : savedCoursesId.includes(course_id) ? (
                        <img
                          src="https://www.svgrepo.com/show/39500/heart.svg"
                          alt="Saved Courses Icon"
                          className="saved_courses_img"
                          onClick={removeFromSavedCourses}
                        />
                      ) : (
                        <img
                          src="https://www.svgrepo.com/show/53700/heart.svg"
                          alt="Saved Courses Icon"
                          className="saved_courses_img"
                          onClick={handleSaveCourses}
                        />
                      )
                    ) : null}
                  </div>
                  <div className="course-rate">{stars(course)}</div>
                  <p>
                    A course by{" "}
                    <Link to={`/user/${course.owner.id}`}>
                      <b>{course.owner.name}</b>
                    </Link>
                    , {user.profession}
                  </p>
                </div>
                <div className="course-page-lenguage">
                  <img src={audioIcon} alt="Available Audio Icon" />
                  <p>Audio: English</p>
                  <img src={subtitlesIcon} alt="Available Subtitles Icon" />
                  <p>
                    Spanish, English, Portuguese, German, French, Italian,
                    Polish, Dutch
                  </p>
                </div>
                <div className="course-page-trailer">
                  <div className="course-page-trailer-header">Information</div>
                  <img src={course.images[0]} alt="Course Cover" />
                  <div className="course-page-trailer-footer">
                    {strUser ? (
                      course.owner.email === JSON.parse(strUser).email ? (
                        ""
                      ) : (
                        <>
                          {isInWishlist ? (
                            <p onClick={removeFromWishlist}>In cart</p>
                          ) : (
                            <p onClick={handleAddToWhislist}>+ Add to cart</p>
                          )}
                        </>
                      )
                    ) : (
                      <p onClick={handleAddToWhislist}>+ Add to cart</p>
                    )}
                  </div>
                </div>
                <div className="course-page-about">
                  <h2>{course.description}</h2>
                  <p>{course.about}</p>
                </div>
                {isLoading ? (
                  <div className="course-page-loading-container">
                    <DotLoader color={theme === "dark" ? "#fff" : "#20222C"} />
                  </div>
                ) : (
                  ""
                )}
                <div className="course-page-imgs-carousel" ref={ref2}>
                  {course.images.map((img, i) => {
                    return i != 0 ? (
                      <img
                        src={img}
                        alt="Carousel img"
                        key={i}
                        style={{ display: isLoading ? "none" : "block" }}
                        onLoad={() => handleLoading()}
                      />
                    ) : (
                      ""
                    );
                  })}
                </div>
                <div
                  className="course-page-price"
                  id="course-page-price-responsive"
                >
                  <CoursePriceModal
                    course={course}
                    view={inView}
                    view2={inView2}
                    handlePriceModal={
                      isInWishlist ? removeFromWishlist : handleAddToWhislist
                    }
                    user={strUser}
                    isInWishlist={isInWishlist}
                  />
                  <div className="course-page-price-elements">
                    <h1>{course.price} USD</h1>
                    <p>
                      75% Disc. <span>{course.price * 4} USD</span>
                    </p>
                    <small>This offer ends in 7 days</small>
                    {strUser ? (
                      course.owner.email === JSON.parse(strUser).email ? (
                        ""
                      ) : (
                        <div className="course-page-price-button">
                          {isInWishlist ? (
                            <Button
                              description="In cart"
                              handleModal={removeFromWishlist}
                              className="in-wishlist-button"
                              icon={
                                "https://www.svgrepo.com/show/143534/shopping-cart-full.svg"
                              }
                            />
                          ) : (
                            <Button
                              description="+ Add to cart"
                              handleModal={handleAddToWhislist}
                            />
                          )}
                        </div>
                      )
                    ) : (
                      <div className="course-page-price-button">
                        <Button
                          description="+ Add to cart"
                          handleModal={handleAddToWhislist}
                        />
                      </div>
                    )}

                    <div className="course-page-price-detail">
                      <ul>
                        <li>
                          <img
                            src="https://www.svgrepo.com/show/1198/like.svg"
                            alt="Like Icon"
                          />{" "}
                          100% positive reviews (461)
                        </li>
                        <li>
                          <img
                            src="https://www.svgrepo.com/show/357225/student.svg"
                            alt="Student Icon"
                          />{" "}
                          13414 students
                        </li>
                        <li>
                          <img
                            src="https://www.svgrepo.com/show/256299/book-study.svg"
                            alt="Lessons Icon"
                          />{" "}
                          41 lessons (6h 52m)
                        </li>
                        <li>
                          <img
                            src="https://www.svgrepo.com/show/383210/books-study-learning-education-reading-library.svg"
                            alt="Courses Icon"
                          />{" "}
                          6 courses
                        </li>
                        <li>
                          <img
                            src="https://www.svgrepo.com/show/56315/download.svg"
                            alt="Download Icon"
                          />{" "}
                          28 downloads (16 files)
                        </li>
                        <li ref={ref}>
                          <img
                            src="https://www.svgrepo.com/show/353760/forever.svg"
                            alt="Unlimited Acces Icon"
                          />{" "}
                          Unlimited access forever
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <Usercard user={user} />
              </div>
              <div className="course-page-price">
                <CoursePriceModal
                  course={course}
                  view={inView}
                  view2={inView2}
                  handlePriceModal={
                    isInWishlist ? removeFromWishlist : handleAddToWhislist
                  }
                  user={strUser}
                  isInWishlist={isInWishlist}
                />
                <div className="course-page-price-elements">
                  <h1>{course.price} USD</h1>
                  <p>
                    75% Disc. <span>{course.price * 4} USD</span>
                  </p>
                  <small>This offer ends in 7 days</small>
                  {strUser ? (
                    course.owner.email === JSON.parse(strUser).email ? (
                      ""
                    ) : (
                      <div className="course-page-price-button">
                        {isInWishlist ? (
                          <Button
                            description="In cart"
                            handleModal={removeFromWishlist}
                            className="in-wishlist-button"
                            icon={
                              "https://www.svgrepo.com/show/143534/shopping-cart-full.svg"
                            }
                          />
                        ) : (
                          <Button
                            description="+ Add to cart"
                            handleModal={handleAddToWhislist}
                          />
                        )}
                      </div>
                    )
                  ) : (
                    <div className="course-page-price-button">
                      <Button
                        description="+ Add to cart"
                        handleModal={handleAddToWhislist}
                      />
                    </div>
                  )}

                  <div className="course-page-price-detail">
                    <ul>
                      <li>
                        <img
                          src="https://www.svgrepo.com/show/1198/like.svg"
                          alt="Like Icon"
                        />{" "}
                        100% positive reviews (461)
                      </li>
                      <li>
                        <img
                          src="https://www.svgrepo.com/show/357225/student.svg"
                          alt="Student Icon"
                        />{" "}
                        13414 students
                      </li>
                      <li>
                        <img
                          src="https://www.svgrepo.com/show/256299/book-study.svg"
                          alt="Lessons Icon"
                        />{" "}
                        41 lessons (6h 52m)
                      </li>
                      <li>
                        <img
                          src="https://www.svgrepo.com/show/383210/books-study-learning-education-reading-library.svg"
                          alt="Courses Icon"
                        />{" "}
                        6 courses
                      </li>
                      <li>
                        <img
                          src="https://www.svgrepo.com/show/56315/download.svg"
                          alt="Download Icon"
                        />{" "}
                        28 downloads (16 files)
                      </li>
                      <li ref={ref}>
                        <img
                          src="https://www.svgrepo.com/show/353760/forever.svg"
                          alt="Unlimited Acces Icon"
                        />{" "}
                        Unlimited access forever
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        <SimilarCourses course={course} />
      </Layout>
    </>
  );
}

export default Course;
