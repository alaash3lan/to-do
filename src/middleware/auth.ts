// authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";

// define the type for the decoded token
interface DecodedToken {
  email: string;
}

// define the type for the request with user

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // cast the decoded token to the DecodedToken type
    const decodedToken = jwt.verify(token, "mysecretkey") as DecodedToken;
    const user = await User.findOne({ email: decodedToken.email });

    if (!user) return res.status(401).json({ error: "Unauthorized" });
    console.log(user);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
