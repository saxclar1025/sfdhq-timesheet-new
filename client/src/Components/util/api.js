import axios from "axios"

const api = {
  login: (username, password) => {
    return axios.post("/api/login", {username:username, password:password});
  },

  logout: () => {
    return axios.post("/api/logout");
  },

  getAllUsers: () => {
    return axios.get("/api/users");
  },

  getCurrentUser: () => {
    return axios.get("/api/currentuser");
  },

  createNewUser: user => {
    return axios.post("/api/users", user);
  },

  updateUser: (id, update) => {
    return axios.post("/api/users/"+id, update);
  },

  deleteUser: (id) => {
    return axios.post("/api/users/delete/"+id);
  },

  getAllEntries: () => {
    return axios.get("/api/entries");
  },

  getUserEntriesRange: (user, start, end) => {
    return axios.post("/api/entries/user", {
      user:user,
      start: start,
      end: end
    });
  },

  createNewEntry: entry => {
    return axios.post("/api/entries", entry);
  },

  updateEntry: (id, update) => {
    return axios.post("/api/entries/"+id, update);
  },

  deleteEntry: (id) => {
    return axios.post("/api/entries/delete/"+id);
  },

  getAllCourses: () => {
    return axios.get("/api/courses");
  },

  createNewCourse: course => {
    return axios.post("/api/courses", course);
  },

  updateCourse: (id, update) => {
    return axios.post("/api/courses/"+id, update);
  },

  deleteCourse: (id) => {
    return axios.post("/api/courses/delete/"+id);
  }
}

export default api;