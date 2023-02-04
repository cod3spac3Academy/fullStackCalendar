export const LocalStorage = {
  setItem: (key, value) => {
    if (typeof value === "object") {
      // console.log("object");
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      // console.log("not an object");
      localStorage.setItem(key, value);
    }
  },
  getItem: (key) => {
    if (typeof localStorage.getItem(key) === "object") {
      return JSON.parse(localStorage.getItem(key));
    } else {
      return localStorage.getItem(key);
    }
  },
  checkItem: (key) => {
    return localStorage.getItem(key) ? true : false;
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
  },
  clear: () => {
    localStorage.clear();
  },
};
