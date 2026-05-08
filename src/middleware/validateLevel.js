export const validateLevel = (req, res, next) => {
  const { level } = req.body;

  const valid = [100, 200, 300, 400, 500, 600, 700];

  if (!valid.includes(level)) {
    return res.status(400).json({
      message: "Invalid level"
    });
  }

  next();
};