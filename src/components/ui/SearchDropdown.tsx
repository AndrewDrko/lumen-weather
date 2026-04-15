import type { FeaturesType } from "../../contexts/locations/type";
import useLocation from "../../contexts/locations/useLocation";
import DropdownItem from "./DropdownItem";
import styles from "./SearchDropdown.module.css";
import Spinner from "./Spinner";

function SearchDropdown({ locationsData }: { locationsData: FeaturesType[] }) {
  const { loading } = useLocation();
  if (!locationsData) return null;

  return (
    <ul className={styles.container}>
      {loading ? (
        <div className={`${styles.altContainer}`}>
          <Spinner className={styles.spinner} />
        </div>
      ) : (
        locationsData.map((location) => (
          <DropdownItem
            key={location.properties.place_id}
            address1={location.properties.address_line1}
            address2={location.properties.address_line2}
            country={location.properties.country}
            city={location.properties.city}
            lat={location.properties.lat}
            lon={location.properties.lon}
            id={location.properties.place_id}
          />
        ))
      )}
    </ul>
  );
}

export default SearchDropdown;
