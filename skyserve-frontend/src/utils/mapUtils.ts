import * as turf from "@turf/turf";

export const calculateDistance = (coordinates: number[][]) => {
  if (coordinates.length < 2) return 0;

  const line = turf.lineString(coordinates);
  return turf.length(line, { units: "kilometers" });
};

export const createGeoJSON = (type: string, coordinates: any) => {
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type,
      coordinates,
    },
  };
};

export const isValidGeoJSON = (data: any) => {
  try {
    if (typeof data === "string") {
      data = JSON.parse(data);
    }
    return data.type && data.geometry && data.geometry.coordinates;
  } catch {
    return false;
  }
};
