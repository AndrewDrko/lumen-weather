import { useEffect, useRef, useState } from "react";
import useGeoLocation from "../../contexts/locations/useLocation";

export default function useSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { setLocation: setSearchLocation, setDataLocations } = useGeoLocation();

  useEffect(() => {
    const query = location.trim();

    if (!query) {
      setSearchLocation("");
      return;
    }

    const timeout = setTimeout(() => {
      setSearchLocation(query);
    }, 300);

    return () => clearTimeout(timeout);
  }, [location, setSearchLocation]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  function toggleSearch() {
    setIsOpen((prev) => !prev);
    setLocation("");
    setDataLocations(null);
  }

  function closeSearch() {
    setIsOpen(false);
    setDataLocations(null);
  }

  return {
    isOpen,
    location,
    setLocation,
    inputRef,
    toggleSearch,
    closeSearch,
    setIsOpen,
  };
}
