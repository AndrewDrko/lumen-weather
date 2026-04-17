import styles from "./LocationsPage.module.css";
import Search from "../ui/Search";
import PageContainer from "./PageContainer";
import LocationList from "../ui/location/LocationList";
import { useEffect, useState } from "react";
import { loadLocations } from "../../utils/helpers";
import Message from "../ui/Message";
import { MdAddLocationAlt } from "react-icons/md";

function LocationsPage() {
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState(loadLocations());

  const filteredLocations = locations.filter((loc) =>
    loc.address1.toLowerCase().includes(query.toLowerCase()),
  );
  useEffect(() => {
    const handleUpdate = () => {
      setLocations(loadLocations());
    };

    window.addEventListener("storage", handleUpdate);

    window.addEventListener("locationsUpdated", handleUpdate);

    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("locationsUpdated", handleUpdate);
    };
  }, []);

  return (
    <PageContainer className={styles.locationsContainer}>
      <Search
        className={styles.search}
        type="normal"
        placeholderText="Buscar locaciones guardadas..."
        value={query}
        onChange={setQuery}
      />
      {!filteredLocations ||
        (filteredLocations.length === 0 && locations.length !== 0 && (
          <Message
            className={styles.message}
            messageDescription="Sin resultados"
          />
        ))}
      {!locations || locations.length === 0 ? (
        <Message
          className={styles.message}
          icon={<MdAddLocationAlt />}
          messageHeader="Sin locaciones agregadas"
          messageDescription="Haz clic en el botón + para agregar nuevas locaciones"
        />
      ) : (
        <>
          <LocationList locations={filteredLocations} />
        </>
      )}
    </PageContainer>
  );
}

export default LocationsPage;
