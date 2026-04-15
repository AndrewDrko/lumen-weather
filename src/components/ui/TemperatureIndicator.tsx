import styles from "./TemperatureIndicator.module.css";

interface TemperatureIndicatorType {
  temperature: number;
  coord: {
    lat: number;
    lon: number;
  };
  weatherState: string;
}

function TemperatureIndicator({
  temperature,
  coord,
  weatherState,
}: TemperatureIndicatorType) {
  return (
    <div className={styles.container}>
      <span className={`${styles.secondaryLabel} ${styles.weatherState}`}>
        {weatherState}
      </span>
      <span className={styles.temperatureLabel}>
        {Math.floor(temperature)}°
      </span>
      <div className={styles.preasuresContainer}>
        <span
          className={`${styles.secondaryLabel} ${styles.preasureIndicator}`}
        >
          Lat: <span>{coord.lat}</span>
        </span>
        <span
          className={`${styles.secondaryLabel} ${styles.preasureIndicator}`}
        >
          Lon: <span>{coord.lon}</span>
        </span>
      </div>
    </div>
  );
}

export default TemperatureIndicator;
