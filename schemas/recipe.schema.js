const Yup = require("yup");

const recipeSchema = Yup.object().shape({
  title: Yup.string().trim().min(2).max(255).required("חובה למלא כותרת עסקה"),
  description: Yup.string().trim().min(2).max(1024),
  image: Yup.string().url().trim(),
  ingredients: Yup.string().trim(),
  preparation: Yup.string().trim(),
  totalTime: Yup.string().trim(),
  tags: Yup.array(),
  updatedAt: Yup.date().nullable(),
  createdAt: Yup.date(),
});

module.exports = recipeSchema;
