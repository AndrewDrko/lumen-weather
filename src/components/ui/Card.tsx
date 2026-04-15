import styles from "./Card.module.css";

function Card({
  children = <h1>No hay datos</h1>,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`${styles.cardContainer} ${className}`}>{children}</div>
  );
}

export default Card;
