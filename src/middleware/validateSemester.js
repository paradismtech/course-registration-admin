export const validateSemester = (req, res, next) => {
  const { semester } = req.body;

  const valid = ["FIRST", "SECOND"];

  if (!valid.includes(semester)) {
    return res.status(400).json({
      message: "Invalid semester"
    });
  }

  next();
};