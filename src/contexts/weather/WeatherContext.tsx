import { createContext, useEffect, useState } from "react";
import type { FullData, WeatherContextType } from "../weather/type";
import { useLocation } from "react-router";
import { getForecast, getWeather } from "../../utils/helpers";

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

function WeatherProvider({ children }: { children: React.ReactNode }) {
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const [data, setData] = useState<FullData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const lat = Number(queryParams.get("lat"));
  const lon = Number(queryParams.get("lon"));

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const [weather, forecast] = await Promise.all([
          getWeather(lat, lon),
          getForecast(lat, lon),
        ]);

        setData({ weather, forecast });
      } catch (err) {
        console.error(err);
        setError("No se pudo obtener el clima");
      } finally {
        setLoading(false);
      }
    }

    if (lat && lon) fetchData();
  }, [API_KEY, lat, lon]);

  return (
    <WeatherContext.Provider value={{ data, error, loading }}>
      {children}
    </WeatherContext.Provider>
  );
}

export { WeatherProvider, WeatherContext };
