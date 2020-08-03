export default {
  hasUser: () => !!localStorage.getItem("user"),
  getUser: () => JSON.parse(localStorage.getItem("user")),
  setUser: (user) => localStorage.setItem("user", JSON.stringify(user)),
  removeUser: () => localStorage.removeItem("user"),
};
