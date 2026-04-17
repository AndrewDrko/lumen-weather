import type { ForecastData, WeatherData } from "../contexts/weather/type";

// TIME AND DATE FORMATERS
export function getLocalTime(timezoneOffset: number): Date {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset();
  return new Date(utc + timezoneOffset * 1000);
}

export function formatTime(date: Date, format: "24" | "12" | "12short" = "24") {
  const time = new Date(date);
  const hours = time.getUTCHours();
  const minutes = time.getUTCMinutes();

  if (format === "24") {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }

  if (format === "12short") {
    const hours12 = hours % 12 === 0 ? 12 : hours % 12;
    const period = hours < 12 ? "AM" : "PM";

    return `${String(hours12)}${period}`;
  }

  if (format === "12") {
    const hours12 = hours % 12 === 0 ? 12 : hours % 12;
    const period = hours < 12 ? "AM" : "PM";

    return `${String(hours12)}:${String(minutes).padStart(2, "0")} ${period}`;
  }
}

// STRING FORMATERS
export function getWindDirection(degrees: number): string {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSO",
    "SO",
    "OSO",
    "O",
    "ONO",
    "NO",
    "NNO",
  ];

  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

type WeatherType = "clouds" | "humidity" | "visibility" | "wind";

export function getWeatherLabel(type: WeatherType, value: number): string {
  switch (type) {
    // NUBES
    case "clouds":
      if (value < 10) return "Despejado";
      if (value < 30) return "Poco nublado";
      if (value < 60) return "Parcialmente nublado";
      if (value < 85) return "Mayormente nublado";
      return "Nublado";

    // HUMEDAD
    case "humidity":
      if (value < 30) return "Humedad baja";
      if (value < 60) return "Humedad moderada";
      if (value < 80) return "Humedad alta";
      return "Humedad muy alta";

    //VISIBILIDAD (millas)
    case "visibility":
      if (value >= 10) return "Excelente visibilidad";
      if (value > 6) return "Buena visibilidad";
      if (value > 3) return "Visibilidad moderada";
      return "Baja visibilidad";

    // VIENTO (km/h)
    case "wind":
      if (value < 5) return "Calma";
      if (value < 15) return "Brisa ligera";
      if (value < 30) return "Viento moderado";
      if (value < 50) return "Viento fuerte";
      return "Viento muy fuerte";

    default:
      return "";
  }
}

export function getPressureLabel(value: number): string {
  if (value < 980) return "Presión muy baja";
  if (value < 1000) return "Presión baja";
  if (value < 1015) return "Presión normal";
  if (value < 1030) return "Presión alta";
  return "Presión muy alta";
}

//////////////////////////////
// UNIT FORMATERS
///////////////////////////////
/**
 * Converts wind speed in different units
 * @param speed - Speed in meters per second
 * @param toUnit - Unit which you desire convert to
 * @returns Value converted
 */
export function windUnitConverter(
  speed: number,
  unit?: "kmh" | "mph" | "ms",
): number {
  if (unit === "kmh") return +(speed * 3.6).toFixed(2);
  if (unit === "mph") return +(speed * 2.237).toFixed(2);

  return speed;
}

/**
 *
 * @param temp - Temperature in celcius
 * @returns Temperature in fahrenheit
 */
export function tempUnitConverter(
  temp: number,
  unit: "fahrenheit" | "celcius",
) {
  if (unit === "fahrenheit") return Math.round(temp * 1.8 + 32);

  return temp;
}

/**
 *
 * @param pressure Pressure in hPa
 * @returns Pressure in inHg
 */
export function pressureUnitConverter(pressure: number, unit: "inHg" | "hpa") {
  if (unit === "inHg") return +(pressure * 0.02953).toFixed(2);
  return pressure;
}

// LOCAL STORAGE
export type Location = {
  lat: number;
  lon: number;
  city: string;
  address1: string;
  place_id: string;
};

export function loadLocations(): Location[] {
  try {
    const data = localStorage.getItem("locations");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveLocation(newLocation: Location) {
  try {
    const store = localStorage.getItem("locations");
    const currentLocations: Location[] = store ? JSON.parse(store) : [];

    const exists = currentLocations.some(
      (loc) => loc.lat === newLocation.lat && loc.lon === newLocation.lon,
    );

    if (exists) return;

    const updatedLocations = [newLocation, ...currentLocations];
    const serialized = JSON.stringify(updatedLocations);

    localStorage.setItem("locations", serialized);

    window.dispatchEvent(new Event("locationsUpdated"));
  } catch (err) {
    console.error("Error saving location", err);
  }
}

export function deleteLocation(place_id: string) {
  try {
    const store = localStorage.getItem("locations");
    if (!store) return;

    const currentLocations: Location[] = JSON.parse(store);

    const updatedLocations = currentLocations.filter(
      (loc) => loc.place_id !== place_id,
    );

    localStorage.setItem("locations", JSON.stringify(updatedLocations));

    window.dispatchEvent(new Event("locationsUpdated"));
  } catch (err) {
    console.error("Error deleting location", err);
  }
}

// FETCHING
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function getWeather(
  lat: number,
  lon: number,
): Promise<WeatherData["weather"]> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`,
  );
  if (!res.ok) {
    throw new Error("Error al obtener el clima actual");
  }

  const data = await res.json();
  return data;
}

export async function getForecast(
  lat: number,
  lon: number,
): Promise<ForecastData["forecast"]> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`,
  );

  if (!res.ok) {
    throw new Error("Error al obtener el pronóstico");
  }

  const data = await res.json();

  return data;
}
