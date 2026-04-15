import styles from "./WeatherIcon.module.css";

function WeatherIcon({
  icon,
  className = "",
}: {
  icon: string;
  className?: string;
}) {
  const API_MEDIA = import.meta.env.VITE_OPENWEATHER_API_MEDIA;

  return (
    <div className={`${styles.iconContainer} ${className}`}>
      <img className={`${styles.icon}`} src={`${API_MEDIA}${icon}.png`} />
    </div>
  );
}

export default WeatherIcon;
