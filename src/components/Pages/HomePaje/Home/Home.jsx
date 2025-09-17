import styles from "./Home.module.scss";

export function Home() {
  // В любом компоненте
  console.log("API URL:", import.meta.env.VITE_API_URL);
  return (
    <div>
      <div style={{ height: "100vh", position: "relative" }}>
        <div className={styles.fonHome}></div>
        <h1 className={styles.ReadLeaf}>
          <br />
          ReadLeaf
        </h1>
        <p className={styles.p}>листай, читай, вдохновляйся</p>
      </div>
    </div>
  );
}
