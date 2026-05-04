import supabase from "../config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .or(`matric_no.eq.${identifier},staff_no.eq.${identifier}`)
      .single();

    if (error || !user) {
      return res.status(400).json({ message: "User not found" });
    }

    // First-time password setup
    if (!user.password) {
      const hashed = await bcrypt.hash(password, 10);

      await supabase
        .from("users")
        .update({ password: hashed })
        .eq("id", user.id);

      const token = generateToken({
        id: user.id,
        role: user.role,
      });

      return res.json({
        message: "Password set successfully",
        token,
        user,
      });
    }

    // Normal login
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    res.json({ token, user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};