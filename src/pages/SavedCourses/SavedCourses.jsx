import React, {useState, useContext, useEffect, useCallback} from 'react'
import CourseList from "../../components/CourseList/CoursesList"
import Layout from '../../components/Layout/Layout';
import { fetchWishlist } from '../../hooks/fetchWishlist';
import { UserContext } from "../../context/UserContext";
import "./saved-courses.css"

function SavedCourses() {

  const [savedCourses, setSavedCourses] = useState([]);
  const {savedCoursesId, strUser} = useContext(UserContext);
  const user = strUser ? JSON.parse(strUser) : " ";

  const handleCourses = () => {
    fetchWishlist(savedCoursesId, setSavedCourses);
  };

  useEffect(() => {
    handleCourses();
  }, [savedCoursesId]);

  return (
    <>
    <div className="saved-courses-container">
    <Layout>
    <CourseList title="Your saved courses" array={savedCourses}/>
    </Layout>
    </div>
    </>
  )
}

export default SavedCourses