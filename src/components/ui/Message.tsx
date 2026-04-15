import styles from "./Message.module.css";

function Message({
  messageDescription,
  messageHeader,
  icon,
  className = "",
}: {
  messageDescription: string;
  messageHeader?: string;
  icon?: React.ReactElement;
  className?: string;
}) {
  return (
    <div className={`${styles.messageContainer} ${className}`}>
      <div className={styles.messageIcon}>{icon}</div>
      <h2>{messageHeader}</h2>
      <span>{messageDescription}</span>
    </div>
  );
}

export default Message;
