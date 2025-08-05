import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  // generate token
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // send to user through cookie 
  res.cookie(
    "jwt",
    token,
    {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day in MS
      httpOnly: true, // prevent XSS attack (cross-site scripting attacks)
      sameSite: "strict", // CSRF attack (cross site request forgery attack)
      secure: process.env.NODE_ENV !== "dev"
    }
  );

  return token;
}