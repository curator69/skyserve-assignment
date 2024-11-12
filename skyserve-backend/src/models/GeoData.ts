import mongoose from "mongoose";

const geoDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
    enum: ["geojson", "kml", "tiff"],
  },
  filePath: {
    type: String,
    required: true,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
  properties: {
    type: Map,
    of: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const GeoData = mongoose.model("GeoData", geoDataSchema);
