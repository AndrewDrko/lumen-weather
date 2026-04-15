import { HiClock } from "react-icons/hi";
import styles from "./DayForecast.module.css";
import ForecastHourList from "./ForecastHourList";
import Title from "../../Title";

function DayForecast() {
  return (
    <div className={styles.dayForecastLayout}>
      <Title icon={<HiClock />} text={"Pronóstico del día"} />
      <ForecastHourList />
    </div>
  );
}

export default DayForecast;
