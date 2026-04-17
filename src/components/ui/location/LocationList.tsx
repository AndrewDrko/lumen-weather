import { FaPlus } from "react-icons/fa6";
import type { Location } from "../../../utils/helpers";
import Button from "../Button";
import LocationItem from "./LocationItem";
import styles from "./LocationList.module.css";
import { useSearchContext } from "../../../contexts/search/useSearchContext";

type LocationListProps = {
  locations: Location[];
};

function LocationList({ locations }: LocationListProps) {
  const { setIsOpen } = useSearchContext();
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
      <div className={styles.addLocation}>
        <Button onClick={() => setIsOpen(true)} shape="circle">
          <FaPlus />
        </Button>
        <span>Agregar Nueva Locación</span>
      </div>
    </ul>
  );
}

export default LocationList;
