import Utils from "../../../services/Utils";

export default {
  async fetchRecipe(context, payload) {
    const endpoint = `${Utils.getApiUrl()}recipes/${payload.recipeId}`;
    const res = await fetch(endpoint);
    const resData = await res.json();

    if (!res.ok) {
      throw new Error(res.message || "שגיאה, אנא נסה שוב מאוחר יותר.");
    }
    context.commit("setCurrentRecipe", resData);
  },

  async createRecipe(context, payload) {
    const endpoint = Utils.getApiUrl() + "recipes";
    const body = JSON.stringify({
      title: payload.title,
      description: payload.description,
      image: payload.image,
      ingredients: payload.ingredients,
      preparation: payload.preparation,
      totalTime: payload.totalTime,
      tags: payload.tags,
      bookId: payload.bookId,
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

    await res.json();

    // context.commit("addBook", resData.book);
  },

  async updateRecipe(context, payload) {
    const endpoint = `${Utils.getApiUrl()}recipes/${payload.recipeId}`;
    const body = JSON.stringify({
      title: payload.title,
      description: payload.description,
      image: payload.image,
      ingredients: payload.ingredients,
      preparation: payload.preparation,
      totalTime: payload.totalTime,
      tags: payload.tags,
      bookId: payload.bookId,
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

    await res.json();

    // context.commit("addBook", resData.book);
  },

  async deleteRecipe(context, payload) {
    const endpoint = `${Utils.getApiUrl()}recipes/${payload.recipeId}`;
    const res = await fetch(endpoint, {
      method: "DELETE",
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

    await res.json();

    // context.commit("addBook", resData.book);
  },
};
