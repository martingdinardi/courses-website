import React, { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { getSimilarCourses } from "../../utils/apiConfig";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import CoursesList from "../../components/CourseList/CoursesList";
import "./categories.css"

function Categories() {
  const [courses, setCourses] = useState({});

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const handleCoursesByCategories = async () => {
    const { data } = await getSimilarCourses(path);
    await setCourses(data);
  };

  useEffect(() => {
    try {
      handleCoursesByCategories();
    } catch (error) {
      console.log(error);
    }
  }, [path]);

  return (
    <>
    <div className="categories-page">
      <Navbar links={["Categories", "Blog", "PRO"]} />
      <div className="home-courses">
        <CoursesList title={`${path} Courses`} array={courses} description={`Take your first steps in ${path} world!`} />
      </div>
      <Footer />
    </div>
    </>
  );
}

export default Categories;
