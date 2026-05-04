import supabase from "../config/db.js";

// Add course
export const addCourse = async (req, res) => {
  const { title, code, unit, level, semester, programme_id } = req.body;

  const { data, error } = await supabase
    .from("courses")
    .insert([
      {
        title,
        code,
        unit,
        level,
        semester,
        programme_id,
        created_by: req.user.id,
      },
    ])
    .select();

  if (error) return res.status(400).json({ error });

  res.json(data);
};

// Get courses by programme/level/semester
export const getCourses = async (req, res) => {
  const { programme_id, level, semester } = req.query;

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("programme_id", programme_id)
    .eq("level", level)
    .eq("semester", semester);

  if (error) return res.status(400).json({ error });

  res.json(data);
};

export const getRegistrations = async (req, res) => {
  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .eq("status", "PENDING");

  if (error) return res.status(400).json({ error });

  res.json(data);
};

export const updateRegistration = async (req, res) => {
  const { id, status } = req.body; // APPROVED / REJECTED

  const { data, error } = await supabase
    .from("registrations")
    .update({ status })
    .eq("id", id)
    .select();

  if (error) return res.status(400).json({ error });

  res.json(data);
};