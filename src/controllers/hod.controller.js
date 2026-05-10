import supabase from "../config/db.js";

// Add course
export const addCourse = async (req, res) => {
  try {
    const {
      title,
      code,
      unit,
      level,
      semester,
      programme_id
    } = req.body;

    // Get HOD profile
    const { data: hod } = await supabase
      .from("hods")
      .select("*")
      .eq("user_id", req.user.id)
      .single();

    if (!hod) {
      return res.status(403).json({
        message: "HOD profile not found"
      });
    }

    // Get programme
    const { data: programme } = await supabase
      .from("programmes")
      .select("*")
      .eq("id", programme_id)
      .single();

    if (!programme) {
      return res.status(404).json({
        message: "Programme not found"
      });
    }

    // SECURITY CHECK
    if (programme.department_id !== hod.department_id) {
      return res.status(403).json({
        message: "You can only manage programmes in your department"
      });
    }

    // Create course
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
          created_by: req.user.id
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({ error });
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get courses by programme/level/semester
export const getCourses = async (req, res) => {
  try {
    // Get HOD profile
    const { data: hod } = await supabase
      .from("hods")
      .select("*")
      .eq("user_id", req.user.id)
      .single();

    if (!hod) {
      return res.status(403).json({
        message: "HOD profile not found"
      });
    }

    // Get programmes in the department
    const { data: programmes } = await supabase
      .from("programmes")
      .select("id")
      .eq("department_id", hod.department_id);

    const programmeIds = programmes.map(p => p.id);

    // Get courses in those programmes
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .in("programme_id", programmeIds);

    if (error) return res.status(400).json({ error });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
export const getProgrammes = async (
  req,
  res
) => {

  try {

    const { data, error } =
      await supabase
        .from("programmes")
        .select("*");

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