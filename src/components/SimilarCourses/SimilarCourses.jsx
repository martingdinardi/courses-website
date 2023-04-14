import React, { useState, useEffect } from "react";
import { getSimilarCourses } from "../../utils/apiConfig";
import CoursesList from "../CourseList/CoursesList";

function SimilarCourses({ course }) {
  const [similarCourses, setSimilarCourses] = useState([]);

  const fetchSimilarCourses = async () => {
    if(course){
        const { data } = await getSimilarCourses(course.category);
        await setSimilarCourses(data);
    }
  };

  useEffect(() => {
    try {
      fetchSimilarCourses();
    } catch (err) {
      console.log(err);
    }
  }, [course]);

  return (
    <>
      {course ? (
        <CoursesList
          title="Courses you might be interested in"
          description="You might be interested in the following courses"
          array={similarCourses}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default SimilarCourses;
