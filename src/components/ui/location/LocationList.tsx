import type { Location } from "../../../utils/helpers";
import styles from "./LocationList.module.css";
import LocationItem from "./LocationItem";

type LocationListProps = {
  locations: Location[];
};

function LocationList({ locations }: LocationListProps) {
  return (
    <ul className={styles.listContainer}>
      {locations.map((location) => (
        <LocationItem
          key={location.place_id}
          city={location.address1}
          lat={location.lat}
          lon={location.lon}
          place_id={location.place_id}
        />
      ))}
    </ul>
  );
}

export default LocationList;
