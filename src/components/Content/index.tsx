import  styles from "./index.module.css";
export default function Content({title, children}) {
  return <div>
    <div className={styles.title}> {title}</div>
    
    <div className={styles.content}>
      {children}

    </div>
  </div>;
}
