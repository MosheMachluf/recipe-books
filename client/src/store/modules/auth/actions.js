import Utils from "@/services/Utils";

const apiUrl = Utils.getApiUrl();

export default {
  async login(context, payload) {
    return context.dispatch("auth", {
      mode: "login",
      data: { email: payload.email, password: payload.password },
    });
  },

  async signup(context, payload) {
    return context.dispatch("auth", {
      mode: "signup",
      data: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password,
      },
    });
  },

  async auth(context, payload) {
    const endpoint = apiUrl + "auth/" + payload.mode;
    const body = JSON.stringify(payload.data);

    const res = await fetch(endpoint, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(res.message || "שגיאה בהתחברות, אנא נסה שוב מאוחר יותר.");
    }

    const resData = await res.json();

    localStorage.setItem("token", resData.token);
    localStorage.setItem("userId", resData.userId);

    context.commit("setUser", {
      token: resData.token,
      userId: resData.userId,
      user: resData.user,
    });
  },

  async tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const user = Utils.decodeToken();
    if (!user) {
      return context.dispatch("logout");
    }

    if (user && token && userId) {
      context.commit("setUser", { token, userId, user });
    }
  },

  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    context.commit("setUser", {
      token: null,
      userId: null,
      user: null,
    });
  },
};
