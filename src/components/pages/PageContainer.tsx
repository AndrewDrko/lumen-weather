import styles from "./PageContainer.module.css";

function PageContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`${styles.pageContainer} ${className}`}>{children}</div>
  );
}

export default PageContainer;
