import Spinner from "./Spinner";
import styles from "./SpinnerFullPage.module.css";

function SpinnerFullPage() {
  return (
    <div className={styles.container}>
      <Spinner className={styles.spinner} />
    </div>
  );
}

export default SpinnerFullPage;
