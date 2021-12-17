import Home from "../pages/Home.vue";

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "Profile",
    path: "/profile",
    component: () => import("../pages/profile/Profile.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        name: "EditProfile",
        path: "edit",
        component: () => import("../pages/profile/EditProfile.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "MyBooks",
        path: "my-books",
        component: () => import("../pages/profile/EditProfile.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        name: "MyFav",
        path: "my-fav",
        component: () => import("../pages/profile/EditProfile.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    name: "Explore",
    path: "/explore",
    component: () => import("../pages/Explore.vue"),
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("../pages/auth/Login.vue"),
    meta: { requiresUnauth: true },
  },
  {
    name: "Signup",
    path: "/signup",
    component: () => import("../pages/auth/Signup.vue"),
    meta: { requiresUnauth: true },
  },
  {
    name: "RootBook",
    path: "/book",
    component: () => import("../pages/books/Book.vue"),
    children: [
      {
        name: "AddBook",
        path: "add",
        component: () => import("../pages/books/AddBook.vue"),
        meta: {
          showBackButton: true,
          title: "צור ספר חדש",
          requiresAuth: true,
        },
      },
      {
        name: "EditBook",
        path: ":bookId/edit",
        component: () => import("../pages/books/EditBook.vue"),
        meta: { requiresAuth: true, showBackButton: true },
      },
      {
        name: "Recipes",
        path: ":bookId/recipes",
        component: () => import("../pages/recipes/Recipes.vue"),
        meta: { showBackButton: true, title: "מתכונים" },
      },
      {
        name: "Book",
        path: ":bookId",
        component: () => import("../pages/books/BookDetails.vue"),
        meta: { showBackButton: true },
      },
      {
        name: "AddBookRecipe",
        path: ":bookId/add-recipe",
        component: () => import("../pages/recipes/AddRecipe.vue"),
        meta: { requiresAuth: true, showBackButton: true },
      },
    ],
  },
  {
    name: "RootRecipe",
    path: "/recipe",
    component: () => import("../pages/recipes/Recipe.vue"),
    children: [
      {
        name: "AddRecipe",
        path: "add",
        component: () => import("../pages/recipes/AddRecipe.vue"),
        meta: {
          requiresAuth: true,
          showBackButton: true,
        },
      },
      {
        name: "EditRecipe",
        path: ":recipeId/edit",
        component: () => import("../pages/recipes/AddRecipe.vue"),
        meta: {
          requiresAuth: true,
          showBackButton: true,
        },
      },
      {
        name: "RecipeDetails",
        path: ":recipeId",
        component: () => import("../pages/recipes/RecipeDetails.vue"),
        meta: {
          showBackButton: true,
          requiresAuth: true,
        },
      },
    ],
  },
  { path: "/:notFound(.*)", component: () => import("../pages/NotFound.vue") },
];

export default routes;
