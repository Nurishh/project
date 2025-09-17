import styles from "./Citation.module.scss";
import CitataCvg from "../../../../assets/images/svg/CitataCvj.svg";

export function Citation() {
  return (
    <div className={styles.citataemae}>
      <div className={styles.center}>
        <img src={CitataCvg} alt="citata" />
        <h3>Злых людей нет на свете, есть только люди несчастливые</h3>
        <p>«Мастер и Маргарита», Михаил Булгаков</p>
      </div>
    </div>
  );
}

export function AboutCitation() {
  return (
    <div className={styles.citataemaeAbout}>
      <div className={styles.center}>
        <img src={CitataCvg} alt="citata" />
        <h3>Чтение — это дыхание ума и музыка души.</h3>
      </div>
    </div>
  );
}
