import "./course-list.css";
import { Link, useLocation } from "react-router-dom";
import {stars} from "../../utils/rating-stars"

const CoursesList = ({ array, title, description, icon }) => {
  const location = useLocation();

  return (
    <div className="courses-list">
      <div className="courses-list-title-description">
        <div className="courses-list-title">
        <h4>{title}</h4>
        <img src={icon} alt="" />
        </div>
        <p>{description}</p>
      </div>
      <div className="course-card-list">
        {array.length > 0
          ? array.map((course, i) => {
              return (
                <div key={i} className="course-card">
                  <div className="course-card-image">
                    {course.images && course.images.length ? (
                      <img src={course.images[0]} />
                    ) : (
                      <img src="https://kknd26.ru/images/no_photo.png" />
                    )}
                  </div>
                  <div className="course-card-body">
                    <div className="course-rate">{stars(course)}</div>
                    <Link to={`/course/${course.id}`} key={course.description}>
                      <div className="course-title">
                        <h4>{course.title}</h4>
                      </div>
                    </Link>
                    {location.pathname !== "/profile" ? (
                      <>
                        <Link
                          to={`/course/${course.id}`}
                          key={course.description}
                        >
                          <div className="course-description">
                            <p>{course.description.slice(0, 80)}...</p>
                          </div>
                        </Link>

                        <div className="course-owner">
                          <Link to={`/user/${course.owner.id}`}>
                            <small className="course-owner-name">
                              A course by <b>{course.owner.name}</b>
                            </small>
                          </Link>
                          <Link to={`/user/${course.owner.id}`}>
                            <img
                              src={course.owner.image}
                              alt="Course Owner Image"
                              className="course-owner-image usercard_img"
                            />
                          </Link>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            })
          : <p className="course-card-list-no-courses">There is no courses yet</p>}
      </div>
    </div>
  );
};

export default CoursesList;
