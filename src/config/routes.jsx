// move router

const routes = {
  home: "/",
  profile: "/profile",
  editProfile: "/profile/edit",

  login: "/login",
  register: "/register",
  
  editLesson: "/manager/lesson/:id",
  handleLesson: "/manager/handle-lesson",

  // Manager
  homeManager: "/manager/home",
  editCourse: "/manager/edit-course/:id",
  studentAdmin: "/manager/admin/student",
  teacherAdmin: "/manager/admin/teacher",
  courseAdmin: "/manager/admin/course",
  editUser: "/manager/admin/user/edit/:id",
  newTeacher: "/manager/admin/new-teacher",
};

export default routes;
