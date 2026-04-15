import Selector, { type Option } from "../Selector";
import styles from "./SettingRow.module.css";

type SettingRowProps<T extends string> = {
  title: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  icon?: React.ReactNode;
};

function SettingRow<T extends string>({
  icon,
  title,
  options,
  value,
  onChange,
}: SettingRowProps<T>) {
  return (
    <div className={styles.settingRow}>
      <div className={styles.label}>
        {icon}
        <h1>{title}</h1>
      </div>
      <Selector options={options} value={value} onChange={onChange} />
    </div>
  );
}

export default SettingRow;
