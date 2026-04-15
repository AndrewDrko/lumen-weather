import styles from "./ForecastHourList.module.css";

import ForecastHourItem from "./ForecastHourItem";
import useWeather from "../../../../contexts/weather/useWeather";
import { tempUnitConverter } from "../../../../utils/helpers";
import { usePreferences } from "../../../../contexts/settings/usePreferences";

function ForecastHourList() {
  const { data } = useWeather();
  const { preferences } = usePreferences();

  if (!data) return;

  const forecastData = data.forecast.list;
  const timezone = data.forecast.city.timezone;

  return (
    <ul className={styles.listContainer}>
      <ForecastHourItem
        dt={new Date(data.weather.dt * 1000)}
        text="Ahora"
        temperature={tempUnitConverter(
          data.weather.main.temp,
          preferences.tempUnit,
        )}
        icon={data.weather.weather[0].icon}
      />

      {forecastData
        .filter((_, index) => index < 5)
        .map((day, i) => (
          <ForecastHourItem
            key={i}
            dt={new Date((day.dt + timezone) * 1000)}
            temperature={tempUnitConverter(day.main.temp, preferences.tempUnit)}
            icon={day.weather[0].icon}
          />
        ))}
    </ul>
  );
}

export default ForecastHourList;
