import { getOneCourse } from "../utils/apiConfig";

export const fetchWishlist = async (arr, call) => {
    const courses = [];
    for (const item of arr) {
        const course = await getOneCourse(item);
        courses.push(course.data);
    }
    await call(courses);
  }
