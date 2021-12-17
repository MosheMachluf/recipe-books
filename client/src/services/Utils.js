import jwtDecode from "jwt-decode";

class Utils {
  static decodeToken() {
    const token = localStorage.getItem("token");
    // if (!token) return { error: "No Token Provided" };
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch (err) {
      return null;
    }
  }

  static getApiUrl() {
    return "http://localhost:4000/api/";
  }
}

export default Utils;
