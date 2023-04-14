import axios from "axios";
const baseCoursesURL = "https://courses-site-api.onrender.com/courses";
const baseUsersURL = "https://courses-site-api.onrender.com/users";

//Courses - Site

export const getCourses = () => axios.get(baseCoursesURL); // GET all
export const getOneCourse = async (id) => await axios.get(`${baseCoursesURL}/${id}`); // GET one
export const getMostValuedCourses = () => axios.get( `${baseCoursesURL}?_sort=rating,duration&_order=desc,asc&_limit=15`); // GET most valued
export const getDiscountCourses = () => axios.get( `${baseCoursesURL}?price=11&_sort=rating&_order=desc,asc&_limit=10`); // GET most valued
export const getSimilarCourses = (category) =>axios.get(`${baseCoursesURL}?category=${category}`); // GET similar courses
export const getSuggestCourses = () => axios.get( `${baseCoursesURL}?_sort=rating,duration&_order=desc,asc&_limit=3`); // GET suggest courses
export const deleteCourse = async (id) => await axios.delete(`${baseCoursesURL}/${id}`); // GET one
//Courses - Profile

export const createNewCourse = async (data) => await axios.post(baseCoursesURL, data); // POST New Course
export const getLatestCourses = (email) => axios.get(`${baseCoursesURL}?owner.email=${email}&_sort=date&_order=desc&_limit=4`); // GET latest
export const getMostValuedProfileCourses = (email) => axios.get( `${baseCoursesURL}?owner.email=${email}&_sort=rating&_order=desc,asc&_limit=4`);

//User

export const loginUser = (email) => axios.get(`${baseUsersURL}?email=${email}`);
export const createNewUser = async (data) => await axios.post(baseUsersURL, data);
export const getUser = (id) => axios.get(`${baseUsersURL}/${id}`);
export const deleteUser = (id) => axios.delete(`${baseUsersURL}/${id}`);
export const addToWishlist = (id, array) => {
  try {
    const res = fetch(`${baseUsersURL}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ wishlist: array }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
};
export const saveCourse = (id, array) => {
  try {
    const res = fetch(`${baseUsersURL}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ saved_courses: array }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
};
