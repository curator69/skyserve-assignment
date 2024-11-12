import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import MapComponent from "@/components/map/MapComponent";
import { geoDataService } from "@/services/api";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [geoData, setGeoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadGeoData();
  }, []);

  const loadGeoData = async () => {
    try {
      const data = await geoDataService.getUserData();
      setGeoData(data);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await geoDataService.uploadFile(formData);
      toast.success("File uploaded successfully");
      loadGeoData();
    } catch (error) {
      toast.error("Upload failed");
    }
  };

  return (
    <Layout>
      <div className="h-screen flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Map Dashboard</h1>
          <input
            type="file"
            accept=".geojson,.kml,.tiff"
            onChange={(e) =>
              e.target.files && handleFileUpload(e.target.files[0])
            }
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Upload File
          </label>
        </div>
        <div className="flex-1">
          <MapComponent geoData={geoData} onDataChange={loadGeoData} />
        </div>
      </div>
    </Layout>
  );
}
