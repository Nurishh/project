import styles from "./Home.module.scss"

export function Home() {
  // В любом компоненте
  console.log("API URL:", import.meta.env.VITE_API_URL);
  return <div className={styles.fonHome}><h1 className={styles.BookinGo}>BookinGo</h1></div>;
}
