const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI || `mongodb://localhost:27017/recipets`;
mongoose
  .connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch(console.log);
