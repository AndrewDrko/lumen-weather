import type { RefObject } from "react";

export interface SearchContextType {
  isOpen: boolean;
  location: string;
  setLocation: (value: string) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  toggleSearch: () => void;
  closeSearch: () => void;
  setIsOpen: (value: boolean) => void;
}
