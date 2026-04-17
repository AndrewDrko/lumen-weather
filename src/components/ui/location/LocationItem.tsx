import styles from "./LocationItem.module.css";
import { useEffect, useState } from "react";
import {
  deleteLocation,
  formatTime,
  getLocalTime,
  getWeather,
  tempUnitConverter,
} from "../../../utils/helpers";
import type { WeatherData } from "../../../contexts/weather/type";
import WeatherIcon from "../WeatherIcon";

import { useNavigate } from "react-router";
import Button from "../Button";
import { FaMinus } from "react-icons/fa6";
import { usePreferences } from "../../../contexts/settings/usePreferences";

interface LocationItemTypes {
  city: string;
  lat: number;
  lon: number;
  place_id: string;
}

function LocationItem({ city, lat, lon, place_id }: LocationItemTypes) {
  const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

  const [weather, setWeather] = useState<WeatherData["weather"] | null>(null);
  const [img, setImg] = useState("");
  const navigation = useNavigate();
  const { preferences } = usePreferences();

  useEffect(() => {
    async function weatherData() {
      try {
        const dataWeather = await getWeather(lat, lon);
        setWeather(dataWeather);
      } catch (error) {
        console.log(error);
      }
    }
    weatherData();
  }, [lat, lon]);

  useEffect(() => {
    async function getImage() {
      try {
        const res = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(city)}&client_id=${API_KEY}&orientation=landscape&per_page=1`,
        );
        const data = await res.json();
        setImg(data.results[0].urls.small);
      } catch (error) {
        console.error(error);
      }
    }
    getImage();
  }, [city, API_KEY]);

  function handleRemoveLocation(id: string) {
    deleteLocation(id);
  }

  if (!weather) return;

  return (
    <li
      className={styles.locationItem}
      onClick={() => navigation(`/weather?lat=${lat}&lon=${lon}`)}
      style={{
        backgroundImage: `linear-gradient(rgba(34, 34, 34, 0.527), rgba(0, 0, 0, 0.589)), url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={styles.mainInfo}>
        <h1>{city}</h1>
        <span className={styles.time}>
          {formatTime(getLocalTime(weather?.timezone), preferences.hourFormat)}
        </span>
      </div>
      <WeatherIcon className={styles.icon} icon={weather?.weather[0].icon} />
      <span className={styles.description}>
        {weather?.weather[0].description}
      </span>
      <span className={styles.temp}>
        {tempUnitConverter(
          Math.floor(weather?.main.temp),
          preferences.tempUnit,
        )}
        °
      </span>
      <Button
        className={styles.buttonRemove}
        shape="circle"
        type="secondary"
        onClick={() => handleRemoveLocation(place_id)}
      >
        <FaMinus />
      </Button>
    </li>
  );
}

export default LocationItem;
