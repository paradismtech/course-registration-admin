import supabase from "../config/db.js";

// Student views courses
  export const getAvailableCourses = async (req, res) => {
    try {

      const { id } = req.user;

      // get student profile
      const {
        data: student,
        error: studentError
      } = await supabase
        .from("students")
        .select("*")
        .eq("user_id", id)
        .single();

      if (studentError) {

        return res.status(400).json({
          error: studentError.message
        });

      }

      // current semester
      const currentSemester = 1; // this can be dynamic based on date

      // fetch matching courses
      const {
        data: courses,
        error: courseError
      } = await supabase
        .from("courses")
        .select("*")
        .eq(
          "programme_id",
          student.programme_id
        )
        .eq(
          "level",
          student.level
        )
        .eq(
          "semester",
          currentSemester
        );

      if (courseError) {

        return res.status(400).json({
          error: courseError.message
        });

      }

      res.json(courses);

    } catch (err) {

      res.status(500).json({
        error: err.message
      });

    }
  };

export const submitRegistration = async (req, res) => {
  const { level, semester, course_ids } = req.body;

  const { data: existing } = await supabase
  .from("registrations")
  .select("*")
  .eq("student_id", req.user.id)
  .eq("semester", semester)
  .eq("level", level)
  .maybeSingle();

if (existing) {
  return res.status(400).json({
    message: "You already registered for this semester"
  });
}

  // 1. create registration
  const { data: reg, error: regError } = await supabase
    .from("registrations")
    .insert([
      {
        student_id: req.user.id,
        level,
        semester,
      },
    ])
    .select()
    .single();

  if (regError) return res.status(400).json({ error: regError });

  // 2. attach courses
  const courseRows = course_ids.map((id) => ({
    registration_id: reg.id,
    course_id: id,
  }));

  const { error: courseError } = await supabase
    .from("registration_courses")
    .insert(courseRows);

  if (courseError) return res.status(400).json({ error: courseError });

  res.json({ message: "Registration submitted", reg });
};

export const myRegistration = async (req, res) => {
  const { data, error } = await supabase
    .from("registrations")
    .select(`
      *,
      registration_courses (
        course_id
      )
    `)
    .eq("student_id", req.user.id);

  if (error) return res.status(400).json({ error });

  res.json(data);
};