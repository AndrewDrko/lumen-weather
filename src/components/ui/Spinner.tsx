import styles from "./Spinner.module.css";

function Spinner({ className = "" }: { className?: string }) {
  return <span className={`${styles.loader} ${className}`}></span>;
}

export default Spinner;
