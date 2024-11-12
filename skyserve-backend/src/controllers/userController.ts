import { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "../config/config";

export const userController = {
  async register(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const user = new User({ email, password, name });
      await user.save();

      const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
        expiresIn: config.jwtExpiration,
      });

      res.status(201).json({ user, token });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
        expiresIn: config.jwtExpiration,
      });

      res.json({ user, token });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },
};
