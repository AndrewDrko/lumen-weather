import { Slider } from "@mui/material";
import WeatherIcon from "../../WeatherIcon";
import styles from "./ForecastDayItem.module.css";
import { tempUnitConverter } from "../../../../utils/helpers";
import { usePreferences } from "../../../../contexts/settings/usePreferences";

interface ForecastDayItemType {
  day: string;
  icon: string;
  maxTemp: number;
  minTemp: number;
  globalMin: number;
  globalMax: number;
}

function ForecastDayItem({
  day,
  icon,
  maxTemp,
  minTemp,
  globalMax,
  globalMin,
}: ForecastDayItemType) {
  const now = new Date().toLocaleDateString("es-MX", {
    weekday: "short",
  });

  const { preferences } = usePreferences();
  const minFormated = tempUnitConverter(minTemp, preferences.tempUnit);
  const maxFormated = tempUnitConverter(maxTemp, preferences.tempUnit);

  return (
    <li className={styles.itemContainer}>
      <span className={styles.dayLabel}>
        {day === now ? "Hoy" : `${day[0].toLocaleUpperCase()}${day.slice(1)}`}
      </span>
      <WeatherIcon className={styles.icon} icon={icon} />
      <div className={styles.averageData}>
        <span>{minFormated}°</span>
        <div className={styles.rangeSlider}>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={[minTemp, maxTemp]}
            min={globalMin}
            max={globalMax}
            sx={{
              cursor: "default",
              pointerEvents: "none",
              height: "1rem",
              "& .MuiSlider-thumb": {
                display: "none",
              },
            }}
          />
        </div>

        <span>{maxFormated}°</span>
      </div>
    </li>
  );
}

export default ForecastDayItem;
