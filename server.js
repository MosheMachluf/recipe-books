const express = require("express");
const app = express();
const auth = require("./middlewares/auth");
const cors = require("cors");

require("./config/db");

app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

const authRoute = require("./routes/auth.route");
const accountRoute = require("./routes/account.route");
const recipesRoute = require("./routes/recipes.route");
const booksRoute = require("./routes/books.route");

app.use("/api/auth", authRoute);
app.use("/api/account", auth, accountRoute);
app.use("/api/recipes", recipesRoute);
app.use("/api/books", booksRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.use((req, res) => {
  res.send("404! Page Not Found");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server run on port ${PORT} ...`));
