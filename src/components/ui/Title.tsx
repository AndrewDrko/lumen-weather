import styles from "./Title.module.css";

interface TitleType {
  text: string;
  icon: React.ReactElement;
}

function Title({ text, icon }: TitleType) {
  return (
    <div className={styles.title}>
      {icon}
      <h1>{text}</h1>
    </div>
  );
}

export default Title;
