import { useState } from "react";

interface ControlsProps {
  onModeChange: (mode: string) => void;
  onMeasureStart: () => void;
  distance: number | null;
}

export default function Controls({
  onModeChange,
  onMeasureStart,
  distance,
}: ControlsProps) {
  const [activeMode, setActiveMode] = useState<string>("");

  const handleModeChange = (mode: string) => {
    setActiveMode(mode);
    onModeChange(mode);
  };

  return (
    <div className="absolute top-4 right-4 bg-white p-2 rounded shadow-lg">
      <div className="flex flex-col space-y-2">
        <button
          onClick={() => handleModeChange("draw_polygon")}
          className={`px-4 py-2 rounded ${
            activeMode === "draw_polygon"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Draw Polygon
        </button>
        <button
          onClick={() => handleModeChange("draw_point")}
          className={`px-4 py-2 rounded ${
            activeMode === "draw_point"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Add Marker
        </button>
        <button
          onClick={onMeasureStart}
          className={`px-4 py-2 rounded ${
            activeMode === "measure" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Measure Distance
        </button>
      </div>
      {distance !== null && (
        <div className="mt-2 text-sm">Distance: {distance.toFixed(2)} km</div>
      )}
    </div>
  );
}
