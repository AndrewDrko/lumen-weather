import type { ForecastItem } from "../../../../contexts/weather/type";
import useWeather from "../../../../contexts/weather/useWeather";
import ForecastDayItem from "./ForecastDayItem";
import styles from "./ForecastDayList.module.css";

function ForecastDayList() {
  const { data } = useWeather();
  const forecastData = data?.forecast.list;

  type DayAccumulator = {
    day: string;
    temp: number;
    tempMax: number;
    tempMin: number;
    count: number;
    icons: Record<string, number>;
  };

  type AccType = Record<string, DayAccumulator>;

  type DaySummary = {
    day: string;
    avgTemp: number;
    maxTemp: number;
    minTemp: number;
    icon: string;
  };

  if (!forecastData) return null;

  const averageDayData: DaySummary[] = Object.values(
    forecastData.reduce<AccType>((acc, cur: ForecastItem) => {
      const day = new Date(cur.dt * 1000).toLocaleDateString("es-MX", {
        weekday: "short",
      });

      if (!acc[day]) {
        acc[day] = {
          day,
          temp: 0,
          tempMax: -Infinity,
          tempMin: Infinity,
          count: 0,
          icons: {},
        };
      }

      acc[day].temp += cur.main.temp;
      acc[day].count++;

      //(min/max reales)
      acc[day].tempMin = Math.min(acc[day].tempMin, cur.main.temp_min);

      // iconos
      const icon = cur.weather[0].icon;
      acc[day].icons[icon] = (acc[day].icons[icon] ?? 0) + 1;

      return acc;
    }, {}),
  ).map((day) => ({
    day: day.day,
    avgTemp: Math.round(day.temp / day.count),
    maxTemp: Math.round(day.tempMax),
    minTemp: Math.round(day.tempMin),
    icon: Object.entries(day.icons).reduce((a, b) => (b[1] > a[1] ? b : a))[0],
  }));

  const globalMin = Math.min(...averageDayData.map((d) => d.minTemp));
  const globalMax = Math.max(...averageDayData.map((d) => d.maxTemp));

  return (
    <ul className={styles.listContainer}>
      {averageDayData.map((dayData) => (
        <ForecastDayItem
          key={dayData.day}
          day={dayData.day}
          icon={dayData.icon}
          maxTemp={dayData.maxTemp}
          minTemp={dayData.minTemp}
          globalMin={globalMin}
          globalMax={globalMax}
        />
      ))}
    </ul>
  );
}

export default ForecastDayList;
