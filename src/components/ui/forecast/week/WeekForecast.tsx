import { HiCalendarDateRange } from "react-icons/hi2";
import styles from "./WeekForecast.module.css";
import ForecastDayList from "./ForecastDayList";
import Title from "../../Title";

function WeekForecast() {
  return (
    <div className={styles.weekForecastLayout}>
      <Title icon={<HiCalendarDateRange />} text="Pronóstico de 6 días" />
      <ForecastDayList />
    </div>
  );
}

export default WeekForecast;
