// routeConfig
import config from "~/config";

// Router change Pages
import Home from "~/pages/Home";

import { Login, Register } from "~/pages/Auth";
import Profile from "~/pages/Profile";
import EditProfile from "~/pages/Profile/EditProfile";
import { ManagerLayout } from "~/layouts";
import {
  StudentAdmin,
  TeacherAdmin,
  HomeManager,
  NewTeacher,
  EditUser,
  CourseAdmin,
  EditCourse,
  EditLesson,
  HandleLesson,
  NewCourse,
} from "~/pages/Manager";
import { CourseTeacher } from "~/pages/Manager/Teacher";
import CourseSold from "~/pages/Manager/Teacher/CourseSold";

const publicRoutes = [
  { path: config.routes.home, component: Home },

  { path: config.routes.profile, component: Profile },
  { path: config.routes.editProfile, component: EditProfile },

  { path: config.routes.login, component: Login, Layout: null },
  { path: config.routes.register, component: Register, Layout: null },

  { path: config.routes.editLesson, component: EditLesson, Layout: null },
  { path: config.routes.handleLesson, component: HandleLesson, Layout: null },

  // Manager
  {
    path: config.routes.homeManager,
    component: HomeManager,
    Layout: ManagerLayout,
  },
  {
    path: config.routes.newTeacher,
    component: NewTeacher,
    Layout: ManagerLayout,
  },
  {
    path: config.routes.studentAdmin,
    component: StudentAdmin,
    Layout: ManagerLayout,
  },
  {
    path: config.routes.courseAdmin,
    component: CourseAdmin,
    Layout: ManagerLayout,
  },
  {
    path: config.routes.teacherAdmin,
    component: TeacherAdmin,
    Layout: ManagerLayout,
  },
  {
    path: config.routes.editUser,
    component: EditUser,
    Layout: ManagerLayout,
  },
  {
    path: config.routes.editCourse,
    component: EditCourse,
    Layout: ManagerLayout,
  },

  // Teacher manager
  {
    path: config.routes.newCourse,
    component: NewCourse,
    Layout: ManagerLayout,
  },
  {
    path: config.routes.courseTeacher,
    component: CourseTeacher,
    Layout: ManagerLayout,
  },
  {
    path: config.routes.courseSold,
    component: CourseSold,
    Layout: ManagerLayout,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
