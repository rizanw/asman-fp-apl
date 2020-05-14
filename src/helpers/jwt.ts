import jwt from "jsonwebtoken";
const JWT_SECRET: string = process.env.JWT_SECRET || "secret";

export function generateToken(subject: any) {
  let options = {
    subject: subject,
    issuer: "a7pro/asset_management",
    notBefore: 0,
    expiresIn: "7d"
  };

  return jwt.sign({}, JWT_SECRET, options);
}
