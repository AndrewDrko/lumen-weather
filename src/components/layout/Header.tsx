import styles from "./Header.module.css";
import Search from "../ui/Search";
import LocationIndicator from "../ui/LocationIndicator";
import { useEffect, useState } from "react";
import useWeather from "../../contexts/weather/useWeather";
import SearchDropdown from "../ui/SearchDropdown";
import useLocation from "../../contexts/locations/useLocation";
import { useNavigate } from "react-router";
import { useSearchContext } from "../../contexts/search/useSearchContext";

function Header() {
  const { data, error, loading } = useWeather();
  const [scrolled, setScrolled] = useState(false);
  const {
    setIsOpen,
    setLocation,
    isOpen,
    location,
    toggleSearch,
    closeSearch,
    inputRef,
  } = useSearchContext();
  const { dataLocations, setDataLocations } = useLocation();

  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!dataLocations?.features?.length) return;

    const { lat, lon } = dataLocations.features[0].properties;

    navigate(`/weather?lat=${lat}&lon=${lon}`);
    setIsOpen(false);
    setLocation("");
    setDataLocations(null);
  }

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const locationText =
    !data || error || loading
      ? undefined
      : `${data.weather.name}, ${data.weather.sys.country}`;

  return (
    <header
      className={
        scrolled ? `${styles.header} ${styles.scrolled}` : styles.header
      }
    >
      <LocationIndicator text={locationText} isVisible={!isOpen} />
      <Search
        className={styles.search}
        isOpen={isOpen}
        value={location}
        onChange={setLocation}
        onSubmit={handleSubmit}
        onToggle={toggleSearch}
        onClose={closeSearch}
        inputRef={inputRef}
        placeholderText="Buscar locación..."
        type="dropside"
      />
      {isOpen && dataLocations?.features ? (
        <SearchDropdown locationsData={dataLocations.features} />
      ) : null}
    </header>
  );
}

export default Header;
