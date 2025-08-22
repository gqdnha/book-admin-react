import styles from "./index.module.css";
export default function Content({
  title,
  children,
  operation,
}: {
  title: string;
  children: React.ReactNode;
  operation?: React.ReactNode;
}) {
  return (
    <>
      <div className={styles.title}>
        {title}
        <span className={styles.btn}> {operation} </span>
      </div>

      <div className={styles.content}>{children}</div>
    </>
  );
}
