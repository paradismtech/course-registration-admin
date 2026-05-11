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
export const getDepartments = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("departments")
      .select("id, name");

    if (error) {
      return res.status(400).json({
        error: error.message
      });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getHods = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, full_name")
      .eq("role", "HOD");

    if (error) {
      return res.status(400).json({
        error: error.message
      });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};
export const assignHOD = async (req, res) => {
  const { department_id, hod_user_id } = req.body;

  // Check if HOD profile exists, create if not
  const { data: existingHod } = await supabase
    .from("hods")
    .select("*")
    .eq("user_id", hod_user_id)
    .maybeSingle();

  if (!existingHod) {
    const { error: insertError } = await supabase
      .from("hods")
      .insert([{ user_id: hod_user_id, department_id }]);

    if (insertError) return res.status(400).json({ error: insertError });
  } else {
    // Update existing HOD with department
    const { error: hodError } = await supabase
      .from("hods")
      .update({ department_id })
      .eq("user_id", hod_user_id);

    if (hodError) return res.status(400).json({ error: hodError });
  }

  // Update department with HOD
  const { data: deptData, error: deptError } = await supabase
    .from("departments")
    .update({ hod_id: hod_user_id })
    .eq("id", department_id)
    .select();

  if (deptError) return res.status(400).json({ error: deptError });

  res.json(deptData);
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