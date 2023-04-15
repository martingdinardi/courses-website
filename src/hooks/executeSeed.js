import { users as seedusers, courses as seedcourses } from "../../seed.json";
import { users, courses } from "../../db.json";
import { deleteCourse, deleteUser } from "../utils/apiConfig";

export const executeSeed = async () => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id > seedusers.length) {
      deleteUser(users[i].id);
    }
  }
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].id > seedcourses.length) {
      deleteCourse(courses[i].id);
    }
  }
};
