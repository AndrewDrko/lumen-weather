import Button from "./Button";
import styles from "./Selector.module.css";

export type Option<T> = {
  label: string | React.ReactElement;
  value: T;
};

type SelectorType<T> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
};

function Selector<T extends string>({
  options,
  value,
  onChange,
}: SelectorType<T>) {
  return (
    <div className={styles.selector}>
      {options.map((opt) => (
        <Button
          key={opt.value}
          className={`${styles.selectorBtn} ${value === opt.value ? styles.active : ""}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </Button>
      ))}
    </div>
  );
}

export default Selector;
