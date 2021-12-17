const Yup = require("yup");

const signupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "שם פרטי חייב להיות לפחות 2 תווים")
    .max(255)
    .required("חובה למלא שם פרטי"),
  lastName: Yup.string()
    .min(2, "שם משפחה חייב להיות לפחות 2 תווים")
    .max(255)
    .required("חובה למלא שם משפחה"),
  email: Yup.string()
    .min(6)
    .max(255)
    .required("חובה למלא כתובת אימייל")
    .email("כתובת אימייל לא תקינה"),
  password: Yup.string().min(6).max(255).required("חובה למלא סיסמה"),
});

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("חובה למלא כתובת אימייל")
    .email("כתובת אימייל לא תקינה"),
  password: Yup.string()
    .required("חובה למלא סיסמה")
    .min(6, "סיסמה צריכה להכיל לפחות 6 תווים")
    .max(255, "סיסמה יכולה להכיל מקסימום 255 תווים"),
});

const profileSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "שם פרטי חייב להיות לפחות 2 תווים")
    .max(255)
    .required("חובה למלא שם פרטי"),
  lastName: Yup.string()
    .min(2, "שם משפחה חייב להיות לפחות 2 תווים")
    .max(255)
    .required("חובה למלא שם משפחה"),
  email: Yup.string().min(6).max(255).email("כתובת אימייל לא תקינה"),
  password: Yup.string().min(6).max(255),
  newPassword: Yup.string().min(6).max(255),
});
module.exports = { signupSchema, loginSchema, profileSchema };
