import { useSearchContext } from "../../contexts/search/useSearchContext";
import styles from "./Overlay.module.css";

function Overlay({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { isOpen } = useSearchContext();

  return (
    <div className={`${isOpen ? styles.overlay : ""} ${className}`}>
      {children}
    </div>
  );
}

export default Overlay;
