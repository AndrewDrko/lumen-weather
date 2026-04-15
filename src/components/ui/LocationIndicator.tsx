import { HiLocationMarker } from "react-icons/hi";
import styles from "./LocationIndicator.module.css";

function LocationIndicator({
  text = "Sin locación...",
  isVisible = true,
}: {
  text?: string;
  isVisible?: boolean;
}) {
  return (
    <div
      className={`${styles.locationIndicator} ${!isVisible ? styles.hidden : ""}`}
    >
      <HiLocationMarker />
      <span>{text}</span>
    </div>
  );
}

export default LocationIndicator;
