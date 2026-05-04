import supabase from "../config/db.js";

export const getProfile = async (req, res) => {
  try {
    const { id, role } = req.user;

    let table;

    if (role === "STUDENT") table = "students";
    if (role === "HOD") table = "hods";
    if (role === "DEAN") table = "deans";

    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("user_id", id)
      .maybeSingle();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};