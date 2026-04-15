import styles from "./Button.module.css";

interface ButtonType {
  children: string | React.ReactElement;
  shape?: "default" | "circle";
  type?: "primary" | "secondary" | "tertiary";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

function Button({
  children,
  shape = "default",
  type = "primary",
  onClick,
  className = "",
}: ButtonType) {
  return (
    <button
      onClick={onClick}
      onMouseDown={onClick}
      className={`${styles.button} ${styles[type]} ${styles[shape]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
