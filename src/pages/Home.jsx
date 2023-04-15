import React, { useState, useEffect, useContext } from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import CoursesList from "../components/CourseList/CoursesList";
import "./home.css";
import { getMostValuedCourses, getDiscountCourses, deleteCourse, deleteUser } from "../utils/apiConfig";
import { UserContext } from "../context/UserContext";
import ResetDatabaseModal from "../components/ResetDatabaseModal/ResetDatabaseModal";
import { executeSeed } from "../hooks/executeSeed";
import {courses, users} from '../../db.json'

function Home() {
  const [mostValuedCourses, setMostvaluedCourses] = useState([]);
  const [discountCourses, setDiscountCourses] = useState([]);

  const { setShowWishlist, showResetDatabaseModal, setShowResetDatabaseModal } = useContext(UserContext);

  const fetchMostValuedCourses = async () => {
    const { data } = await getMostValuedCourses();
    setMostvaluedCourses(data);
  };

  const fetchDiscountCourses = async () => {
    const { data } = await getDiscountCourses();
    setDiscountCourses(data);
  };

  const restartDatabase = async () => {
    try {
      await setShowResetDatabaseModal(false)
      executeSeed();
      await localStorage.setItem('new_visitor', false)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Bliss";
    try {
      fetchMostValuedCourses();
      fetchDiscountCourses();
      setShowWishlist(false);
    } catch (err) {
      console.log(err);
    }
  }, []);


  return (
    <>
      <Navbar links={["Categories", "Blog", "PRO"]} />
      {
      showResetDatabaseModal ? 
      <ResetDatabaseModal resetDatabase={restartDatabase}/>
        : null
      }
      <div className="home-banner-container">
        <div className="home-banner-content">
          <h1>Bliss is a community for amazing people</h1>
          <p>
            Learn from expert professionals and join the largest online
            community for learners.
          </p>
        </div>
      </div>
      <div className="home-courses">
        <CoursesList
          title="Trending Courses"
          array={mostValuedCourses}
          description="Get access to the best online courses for creatives. Interact with the top professionals and discover the creative world's best-kept secrets."
          icon={"https://www.svgrepo.com/show/391211/flame.svg"}
        />
        <CoursesList
          title="Courses From $10.99!"
          array={discountCourses}
          description="Learn with the best for only $10.99 or even FREE"
        />
      </div>
      <Footer />
    </>
  );
}

export default Home;
