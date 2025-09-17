import styles from "./Footer.module.scss";
import inst from "../../assets/images/svg/inst.svg";
import tg from "../../assets/images/svg/tg.svg";
import whats from "../../assets/images/svg/whats.svg";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.text}>
        <h3>ReadLeaf</h3>
        <p>
          листай <br /> читай <br /> вдохновляйся{" "}
        </p>
      </div>
      <div className={styles.img}>
        <a href="https://t.me/+996550464063">
          <img src={inst} alt="insta" />
        </a>
        <a href="https://t.me/+996550464063">
          <img src={tg} alt="telega" />
        </a>
        <a href="https://t.me/+996550464063">
          <img src={whats} alt="whatsapp" />
        </a>
      </div>
    </footer>
  );
}
