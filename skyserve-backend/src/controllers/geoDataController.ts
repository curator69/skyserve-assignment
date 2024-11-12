import { Request, Response } from "express";
import { GeoData } from "../models/GeoData";
import { AuthRequest } from "../middleware/auth";
import path from "path";

export const geoDataController = {
  async upload(req: AuthRequest, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const geoData = new GeoData({
        userId: req.user.userId,
        name: req.body.name || req.file.originalname,
        fileType: path.extname(req.file.originalname).substring(1),
        filePath: req.file.path,
        properties: req.body.properties,
      });

      await geoData.save();
      res.status(201).json(geoData);
    } catch (error) {
      res.status(500).json({ error: "Upload failed" });
    }
  },

  async getUserData(req: AuthRequest, res: Response) {
    try {
      const geoData = await GeoData.find({ userId: req.user.userId });
      res.json(geoData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch data" });
    }
  },

  async toggleVisibility(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const geoData = await GeoData.findOne({
        _id: id,
        userId: req.user.userId,
      });

      if (!geoData) {
        return res.status(404).json({ error: "Data not found" });
      }

      geoData.isVisible = !geoData.isVisible;
      await geoData.save();
      res.json(geoData);
    } catch (error) {
      res.status(500).json({ error: "Failed to update visibility" });
    }
  },

  async deleteData(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const geoData = await GeoData.findOneAndDelete({
        _id: id,
        userId: req.user.userId,
      });

      if (!geoData) {
        return res.status(404).json({ error: "Data not found" });
      }

      res.json({ message: "Data deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete data" });
    }
  },
};
