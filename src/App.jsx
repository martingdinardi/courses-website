import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../src/App.css";
import Profile from "./pages/Profile";
import { useState, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import Courses from "./pages/Courses";
import Error from "./pages/Error";
import Home from "./pages/Home";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import User from "./pages/User";
import Course from "./pages/Course/Course";
import SavedCourses from "./pages/SavedCourses/SavedCourses";
import Categories from "./pages/Categories/Categories";

function App() {
  const [theme, setTheme] = useState("dark");
  const [isLogged, setIsLogged] = useState(false);
  const [showNewCourseModal, setShowNewCourseModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const strUser = localStorage.getItem("user");
  const [wishlistId, setWishlistId] = useState([]);
  const [wishlist, setWishlist] = useState({});
  const localStorageWishlist = localStorage.getItem("wishlist")
    ? localStorage.getItem("wishlist").split(",")
    : [];
  const localStorageSavedCourses = localStorage.getItem("saved_courses")
    ? localStorage.getItem("saved_courses").split(",")
    : [];
  const [savedCoursesId, setSavedCoursesId] = useState(
    localStorageSavedCourses ? localStorageSavedCourses : []
  );
  const [showWishlist, setShowWishlist] = useState(false);
  const newVisitor = localStorage.getItem("new_visitor") ? false : true;
  const [showResetDatabaseModal, setShowResetDatabaseModal] = useState(true);

  useEffect(() => {
    try {
      if (strUser) {
        setIsLogged(true);
        setWishlistId(localStorageWishlist);
      }
    } catch (error) {
      console.log(error);
    }
  }, [isLogged]);

  useEffect(() => {
    if(localStorage.getItem("new_visitor")){
      setShowResetDatabaseModal(false)
    }
    }, [])

  return (
    <UserContext.Provider
      value={{
        theme,
        setTheme,
        showNewCourseModal,
        setShowNewCourseModal,
        showLoginModal,
        setShowLoginModal,
        isLogged,
        setIsLogged,
        strUser,
        showLogoutModal,
        setShowLogoutModal,
        wishlist,
        setWishlist,
        localStorageWishlist,
        wishlistId,
        setWishlistId,
        showWishlist,
        setShowWishlist,
        localStorageSavedCourses,
        savedCoursesId,
        setSavedCoursesId,
        showResetDatabaseModal,
        setShowResetDatabaseModal
      }}
    >
      <div className="App" id={theme}>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/saved-courses" element={<SavedCourses />} />
            </Route>
            <Route path="*" element={<Error />} />
            <Route path="/" element={<Home />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/course/:id" element={<Course />} />
            <Route path="/category/:category" element={<Categories />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
