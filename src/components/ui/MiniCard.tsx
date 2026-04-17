import styles from "./MiniCard.module.css";
import Title from "./Title";
import { FaArrowUp } from "react-icons/fa6";
import { getWindDirection } from "../../utils/helpers";

type MiniCardType = {
  title: string;
  titleIcon: React.ReactElement;
  value: number;
  unity?: string;
  description?: string;
  windDegrees?: number;
};

function MiniCard({
  title,
  titleIcon,
  unity,
  value,
  description,
  windDegrees,
}: MiniCardType) {
  return (
    <div className={styles.miniCardContainer}>
      <Title text={title} icon={titleIcon} />
      <div className={styles.valueContainer}>
        <span className={styles.valueIndicator}> {value} </span>
        <span className={styles.unityIndicator}>{unity}</span>
      </div>
      {windDegrees !== undefined && windDegrees !== 0 && (
        <div className={styles.windDegreesContainer}>
          <FaArrowUp
            style={{
              transform: `rotate(${windDegrees + 180}deg)`,
            }}
          />
          <span className={styles.windDegreesIndicator}>
            {getWindDirection(windDegrees + 180)}
          </span>
        </div>
      )}

      {description && (
        <blockquote className={styles.descriptionText}>
          {description}
        </blockquote>
      )}
    </div>
  );
}

export default MiniCard;
