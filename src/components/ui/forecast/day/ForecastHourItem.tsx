import { usePreferences } from "../../../../contexts/settings/usePreferences";
import { formatTime } from "../../../../utils/helpers";
import WeatherIcon from "../../WeatherIcon";

import styles from "./ForecastHourItem.module.css";

interface ForecastHourItemType {
  dt: Date;
  icon: string;
  temperature: number;
  text?: string;
}

function ForecastHourItem({
  dt,
  icon,
  temperature,
  text,
}: ForecastHourItemType) {
  const { preferences } = usePreferences();

  const unitMap = {
    "12": "12short",
    "24": "24",
  } as const;

  return (
    <li className={styles.hourItem}>
      <span>
        {!text ? formatTime(dt, unitMap[preferences.hourFormat]) : text}
      </span>
      <WeatherIcon icon={icon} />
      <span>{Math.floor(temperature)}°C</span>
    </li>
  );
}

export default ForecastHourItem;
