import React, { useContext, useState, useEffect } from "react";
import Button from "../Button/Button";
import Usercard from "../Usercard/Usercard";
import "./main.css";
import NewCourseModal from "../NewCourseModal/NewCourseModal";
import { UserContext } from "../../context/UserContext";
import CoursesList from "../CourseList/CoursesList";
import {
  getLatestCourses,
  getMostValuedProfileCourses,
  getOneCourse,
} from "../../utils/apiConfig";
// import CategoriesModal from "../CategoriesModal/CategoriesModal";

function Main({ user }) {
  const { showNewCourseModal, setShowNewCourseModal, strUser } =
    useContext(UserContext);
  const loggedUser = strUser ? JSON.parse(strUser) : " ";

  const [latestCourses, setLatestCourses] = useState([]);
  const [mostValuedCourses, setMostvaluedCourses] = useState([]);
  const [keepStudyingCourses, setKeepStudyingCourses] = useState([]);

  const fetchLastCourses = async () => {
    const { data } = await getLatestCourses(user.email);
    await setLatestCourses(data);
  };

  const fetchMostValuedCourses = async () => {
    const { data } = await getMostValuedProfileCourses(user.email);
    await setMostvaluedCourses(data);
  };

  const fetchKeepStudyingCourses = async () => {
    const courses_id = await loggedUser.enrolled && loggedUser.enrolled.split(",");
    if(courses_id.length){
      const courses = [];
      try {
        courses_id.map(async (id) => {
          const { data } = await getOneCourse(id);
          await courses.push(data);
        });
      } catch (error) {
        console.log(error);
      }
      await setKeepStudyingCourses(courses);
    }
    
  };

  const handleModal = () => setShowNewCourseModal(true);

  useEffect(() => {
    document.title = user ? `Bliss - ${user.name} Profile` : "";

    try {
      fetchLastCourses();
      fetchMostValuedCourses();
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  useEffect(() => {
    try {
      fetchKeepStudyingCourses();
    } catch (err) {
      console.log(err);
    }
  }, []);

  // console.log(strUser);

  return (
    <>
      {user.email === loggedUser.email ? (
        <div
          className="main-background"
          style={{ backgroundImage: `url(${loggedUser.profile_background})` }}
        ></div>
      ) : (
        <div
          className="main-background"
          style={{ backgroundImage: `url(${user.profile_background})` }}
        ></div>
      )}
      <div className="main">
        <div className="main-header">
          <Usercard user={user} />
          {user.email === loggedUser.email ? (
            <>
              <Button description="New Course" handleModal={handleModal} />
            </>
          ) : (
            ""
          )}
        </div>
        {showNewCourseModal ? (
          <NewCourseModal
            fetchLastCourses={fetchLastCourses}
            fetchMostValuedCourses={fetchMostValuedCourses}
          />
        ) : (
          ""
        )}
        <p className="main-user-about">{`"${user.about}"`}</p>
        <CoursesList
          array={latestCourses}
          title={
            user.email === loggedUser.email
              ? "Your latest courses as tutor"
              : "Latest Courses"
          }
        />
        <CoursesList
          array={mostValuedCourses}
          title={
            user.email === loggedUser.email
              ? "Your most valued courses as tutor"
              : "Most valued courses"
          }
        />
        {user.email === loggedUser.email ? (
          <>
            <div className="main-user-keep-studying">
              <CoursesList
                array={keepStudyingCourses}
                title={"Keep studying"}
              />
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Main;
