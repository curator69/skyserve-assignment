import { useEffect } from "react";
import * as turf from "@turf/turf";

interface DrawToolsProps {
  map: mapboxgl.Map;
  draw: any;
  onMeasurement: (distance: number) => void;
}

export default function DrawTools({
  map,
  draw,
  onMeasurement,
}: DrawToolsProps) {
  useEffect(() => {
    map.on("draw.create", updateMeasurement);
    map.on("draw.update", updateMeasurement);

    return () => {
      map.off("draw.create", updateMeasurement);
      map.off("draw.update", updateMeasurement);
    };
  }, [map]);

  const updateMeasurement = (e: any) => {
    const data = draw.getAll();
    if (data.features.length > 0) {
      const lastFeature = data.features[data.features.length - 1];
      if (lastFeature.geometry.type === "LineString") {
        const distance = turf.length(lastFeature, { units: "kilometers" });
        onMeasurement(distance);
      }
    }
  };

  return null;
}
