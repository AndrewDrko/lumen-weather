import styles from "./Search.module.css";
import { HiOutlineX, HiSearch } from "react-icons/hi";

type SearchProps = {
  isOpen?: boolean;
  value: string;
  className?: string;
  placeholderText: string;
  onChange: (value: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  onToggle?: () => void;
  onClose?: () => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  type?: "normal" | "dropside";
};

function Search({
  className = "",
  isOpen,
  value,
  onChange,
  onSubmit,
  onToggle,
  onClose,
  inputRef,
  placeholderText,
  type = "normal",
}: SearchProps) {
  if (type === "dropside")
    return (
      <div
        className={`${styles.container} ${isOpen ? styles.open : ""} ${className}`}
      >
        <div className={styles.inputWrapper}>
          <form onSubmit={onSubmit}>
            <input
              ref={inputRef}
              type="text"
              placeholder={placeholderText}
              className={`${styles.input} ${isOpen ? styles.open : ""}`}
              value={value}
              onBlur={onClose}
              onChange={(e) => onChange(e.target.value)}
            />
          </form>

          <button onClick={onToggle} className={styles.icon}>
            {isOpen ? <HiOutlineX /> : <HiSearch />}
          </button>
        </div>
      </div>
    );

  if (type === "normal")
    return (
      <div className={`${styles.container} ${styles.open} ${className}`}>
        <HiSearch className={styles.searchSvg} />
        <div className={styles.inputWrapper}>
          <form onSubmit={onSubmit}>
            <input
              ref={inputRef}
              type="text"
              placeholder={placeholderText}
              className={`${styles.input} ${styles.open}`}
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          </form>
        </div>
      </div>
    );
}

export default Search;
