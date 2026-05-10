import supabase from "../config/db.js";

export const createFaculty = async (req, res) => {
  const { name } = req.body;

  const { data, error } = await supabase
    .from("faculties")
    .insert([{ name }])
    .select();

  if (error) return res.status(400).json({ error });

  res.json(data);
};

export const createDepartment = async (req, res) => {
  const { name, faculty_id } = req.body;

  const { data, error } = await supabase
    .from("departments")
    .insert([{ name, faculty_id }])
    .select();

  if (error) return res.status(400).json({ error });

  res.json(data);
};

export const createProgramme = async (req, res) => {
  const { name, duration, department_id } = req.body;

  const { data, error } = await supabase
    .from("programmes")
    .insert([{ name, duration, department_id }])
    .select();

  if (error) return res.status(400).json({ error });

  res.json(data);
};

export const assignHOD = async (req, res) => {
  const { department_id, hod_user_id } = req.body;

  const { data, error } = await supabase
    .from("departments")
    .update({ hod_id: hod_user_id })
    .eq("id", department_id)
    .select();

  if (error) return res.status(400).json({ error });

  res.json(data);
};

export const getStructure = async (req, res) => {
  try {
    const { data, error } =
      await supabase
        .from("faculties")
        .select(`*, departments (*,programmes (*))`);
    if (error) {
      return res.status(400).json({
        error: error.message
      });
    }

    res.json(data);

  } catch (err) { res.status(500).json({ error: err.message });}
};