import type { Location } from "../../../utils/helpers";
import LocationItem from "./LocationItem";
import styles from "./LocationList.module.css";

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
