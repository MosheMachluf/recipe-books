import Utils from "../../../services/Utils";

export default {
  async fetchMyBooks(context) {
    const endpoint = Utils.getApiUrl() + "books";
    const res = await fetch(endpoint, {
      headers: {
        Authorization: "Bearer " + context.rootGetters["auth/token"],
      },
    });

    if (!res.ok) {
      throw new Error(res.message || "שגיאה, אנא נסה שוב מאוחר יותר.");
    }

    const resData = await res.json();

    context.commit("setMyBooks", resData);
  },

  async fetchAllBooks(context) {
    const endpoint = Utils.getApiUrl() + "books/all";
    const res = await fetch(endpoint);

    if (!res.ok) {
      throw new Error(res.message || "שגיאה, אנא נסה שוב מאוחר יותר.");
    }

    const resData = await res.json();

    context.commit("setAllBooks", resData);
  },

  async fetchBookRecipes(context, payload) {
    const endpoint = Utils.getApiUrl() + "recipes/book/" + payload.bookId;
    const res = await fetch(endpoint);

    if (!res.ok) {
      throw new Error(res.message || "שגיאה, אנא נסה שוב מאוחר יותר.");
    }

    const resData = await res.json();

    context.commit("setBookRecipes", resData);
  },

  async fetchBook(context, payload) {
    const endpoint = Utils.getApiUrl() + "books/single/" + payload.bookId;
    const res = await fetch(endpoint);

    if (!res.ok) {
      throw new Error(res.message || "שגיאה, אנא נסה שוב מאוחר יותר.");
    }

    const resData = await res.json();

    context.commit("setCurrentBook", resData);
  },

  async createBook(context, payload) {
    const endpoint = Utils.getApiUrl() + "books";
    const body = JSON.stringify({
      title: payload.title,
      description: payload.description,
      image: payload.image,
    });

    const res = await fetch(endpoint, {
      method: "POST",
      body,
      headers: {
        Authorization: "Bearer " + context.rootGetters["auth/token"],
        "Content-Type": "application/json",
      },
    });

    if (res.status == 401) {
      throw new Error("אין לך הרשאה");
    }

    if (!res.ok) {
      throw new Error(res.message || "שגיאה, אנא נסה שוב מאוחר יותר.");
    }

    const resData = await res.json();

    context.commit("addBook", resData.book);
  },

  async updateBook(context, payload) {
    const endpoint = `${Utils.getApiUrl()}books/${payload.bookId}`;
    const body = JSON.stringify({
      title: payload.title,
      description: payload.description,
      image: payload.image,
      status: payload.status,
    });

    const res = await fetch(endpoint, {
      method: "PUT",
      body,
      headers: {
        Authorization: "Bearer " + context.rootGetters["auth/token"],
        "Content-Type": "application/json",
      },
    });

    if (res.status == 401) {
      throw new Error("אין לך הרשאה");
    }

    if (!res.ok) {
      throw new Error(res.message || "שגיאה, אנא נסה שוב מאוחר יותר.");
    }

    // const resData = await res.json();

    // context.commit("updateBook", resData);
  },

  async deleteBook(context, payload) {
    const endpoint = `${Utils.getApiUrl()}books/${payload.bookId}`;
    const res = await fetch(endpoint, { method: "DELETE" });

    if (res.status == 401) {
      throw new Error("אין לך הרשאה");
    }

    if (!res.ok) {
      throw new Error(res.message || "שגיאה, אנא נסה שוב מאוחר יותר.");
    }

    // const resData = await res.json();

    // context.commit("updateBook", resData);
  },
};
