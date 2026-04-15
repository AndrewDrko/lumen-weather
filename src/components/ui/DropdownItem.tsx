import { useNavigate } from "react-router";
import styles from "./DropdownItem.module.css";
import Button from "./Button";
import { FaMinus, FaPlus } from "react-icons/fa6";
import {
  deleteLocation,
  loadLocations,
  saveLocation,
} from "../../utils/helpers";

function DropdownItem({
  address1,
  address2,
  country,
  city,
  lat,
  lon,
  id,
}: {
  address1: string;
  address2?: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
  id: string;
}) {
  const navigate = useNavigate();
  const storedIds = loadLocations().map((l) => l.place_id);
  const isInList = storedIds.some((storeId) => storeId === id);

  function handleLocationClic() {
    navigate(`/weather?lat=${lat}&lon=${lon}`);
  }

  function handleSaveLocationClic(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    saveLocation({
      place_id: id,
      address1,
      city,
      lat,
      lon,
    });
  }

  function handleDeleteLocation(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    deleteLocation(id);
  }

  return (
    <li onMouseDown={handleLocationClic} className={styles.dropdownItem}>
      <div className={styles.locationInfo}>
        <h2>
          {address1} {address2 && `| ${address2}`}
        </h2>
        <span>{country}</span>
      </div>

      <Button
        onClick={
          isInList
            ? (e) => handleDeleteLocation(e)
            : (e) => handleSaveLocationClic(e)
        }
        shape="circle"
        type={isInList ? "secondary" : "primary"}
      >
        {isInList ? <FaMinus /> : <FaPlus />}
      </Button>
    </li>
  );
}

export default DropdownItem;
