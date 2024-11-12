export const config = {
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
  jwtExpiration: "24h",
  port: process.env.PORT || 8000,
  allowedFileTypes: [".geojson", ".kml", ".tiff"],
  maxFileSize: 10 * 1024 * 1024, // 10MB
};
