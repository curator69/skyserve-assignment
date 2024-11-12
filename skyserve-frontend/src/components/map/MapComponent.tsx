import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface MapComponentProps {
  geoData: any[];
  onDataChange: () => void;
}

export default function MapComponent({
  geoData,
  onDataChange,
}: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const draw = useRef<MapboxDraw | null>(null);

  useEffect(() => {
    if (!map.current && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [73.8567, 18.5204], // Pune coordinates
        zoom: 12,
      });

      draw.current = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true,
          point: true,
          line_string: true,
        },
      });

      map.current.addControl(draw.current);
      map.current.addControl(new mapboxgl.NavigationControl());
      map.current.addControl(new mapboxgl.ScaleControl({ unit: "metric" }));
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (map.current && geoData) {
      // Add GeoJSON data to map
      geoData.forEach((data) => {
        if (!map.current!.getSource(data._id)) {
          map.current!.addSource(data._id, {
            type: "geojson",
            data: data.geoData,
          });

          map.current!.addLayer({
            id: data._id,
            source: data._id,
            type: "fill",
            paint: {
              "fill-color": "#088",
              "fill-opacity": 0.8,
            },
          });
        }
      });
    }
  }, [geoData]);

  return <div ref={mapContainer} className="w-full h-full rounded-lg" />;
}
