// Class that handles all the fetch requests to the backend
import { SERVER_URL, EVENT_PATH } from "../config/api.constants";
// import localStorage
import { LocalStorage } from "../services/LocalStorage.service";

export default class Fetch {
  static async get() {
    const response = await fetch(`${SERVER_URL}${EVENT_PATH}`, {
      headers: {
        "auth-token": LocalStorage.getItem("token"),
      },
    });
    const data = await response.json();
    return data;
  }

  static async post(body) {
    const response = await fetch(`${SERVER_URL}${EVENT_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  }

  static async update(body, id) {
    const response = await fetch(`${SERVER_URL}${EVENT_PATH}${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  }

  static async delete(id) {
    const response = await fetch(`${SERVER_URL}${EVENT_PATH}${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  }
}
