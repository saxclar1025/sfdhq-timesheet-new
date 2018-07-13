import axios from "axios"

const api = {
  getAllUsers: () => {
    return axios.get("/api/users");
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

  createNewEntry: entry => {
    return axios.post("/api/entries", entry);
  },

  getAllCourses: () => {
    return axios.get("/api/courses");
  },

  createNewCourse: course => {
    return axios.post("/api/courses", course);
  }
}

export default api;