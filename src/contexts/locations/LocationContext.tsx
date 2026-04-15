import { createContext, useEffect, useState } from "react";
import type { FullData, LocationContextType } from "./type";

const LocationContext = createContext<LocationContextType | undefined>(
  undefined,
);

function LocationProvider({ children }: { children: React.ReactNode }) {
  const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

  const [dataLocations, setDataLocations] = useState<FullData | null>(null);
  const [location, setLocation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!location.trim()) {
      setDataLocations(null);
      return;
    }

    const controller = new AbortController();

    async function searchLocations() {
      try {
        setLoading(true);

        const res = await fetch(
          `https://api.geoapify.com/v1/geocode/search?apiKey=${API_KEY}&name=${location}&type=city`,
          { signal: controller.signal },
        );

        const data = await res.json();
        setDataLocations(data);
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
        setError("No se pudo obtener la locación");
      } finally {
        setLoading(false);
      }
    }

    searchLocations();

    return () => {
      controller.abort();
    };
  }, [location, API_KEY]);

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        dataLocations,
        error,
        loading,
        setDataLocations,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export { LocationProvider, LocationContext };
