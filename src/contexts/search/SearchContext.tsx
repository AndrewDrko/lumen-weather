import { createContext, useEffect, useRef, useState } from "react";
import useGeoLocation from "../../contexts/locations/useLocation";
import type { SearchContextType } from "./type";

const SearchContext = createContext<SearchContextType | undefined>(undefined);

function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { setLocation: setSearchLocation, setDataLocations } = useGeoLocation();

  useEffect(() => {
    if (!location.trim()) return;

    const timeout = setTimeout(() => {
      setSearchLocation(location.trim());
    }, 150);

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
    setLocation("");
    setDataLocations(null);
  }

  return (
    <SearchContext.Provider
      value={{
        isOpen,
        location,
        setLocation,
        inputRef,
        toggleSearch,
        closeSearch,
        setIsOpen,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export { SearchProvider, SearchContext };
