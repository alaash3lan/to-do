import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";
import * as joi from "joi";

const checkEmailInUse = async (email: string) => {
  console.log("here 2");
  const user = await User.findOne({ email: email });
  return user ? false : true;
};

const userLoginSchema = joi.object({
  email: joi.string().required().email(),
  password: joi.string().required(),
});
const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required().email(),
  password: joi.string().required(),
});

export const register = async (req: Request, res: Response) => {
  const validationResult = userSchema.validate(req.body);
  if (validationResult.error) {
    res.status(422).json(validationResult.error);
    return;
  }
  try {
    const { email, name, password } = validationResult.value;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      email: email,
      name: name,
      password: hashedPassword,
    });
    await user.save();
    res.json({ message: "User registered successfully." });
  } catch (err) {
    res.status(422).json("Email is not unique");
  }
};

export const login = async (req: Request, res: Response) => {
  const validationResult = await userLoginSchema.validate(req.body);
  if (validationResult.error) {
    res.status(422).json(validationResult.error);
    return;
  }
  const { email, password } = validationResult.value;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ error: "Invalid email or password." });
    return;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ error: "Invalid email or password." });
    return;
  }
  const token = jwt.sign({ name: user.name, email: user.email }, "mysecretkey");
  res.json({ token });
};

interface DecodedToken {
  email: string;
}
export const logout = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decodedToken = jwt.verify(token, "mysecretkey") as DecodedToken;
      const user = await User.findOne({ email: decodedToken.email });
    } catch (err) {
      res.status(401).json({ error: "Unauthorized." });
    }
  }
};
