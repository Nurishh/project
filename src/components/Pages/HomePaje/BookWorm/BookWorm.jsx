import React from "react";
import styles from "./BookWorm.module.scss";

export function BookWorm() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <h3>А вы знали</h3>
          <p>
            что «книжный червь» — это простонародное название реальных червей,
            которые ели корешки от книг? Потом этим словосочетанием начали
            называть людей, которые, конечно, мало имеют сходства с червями,
            однако любят книги так сильно, что читают их прямо до корешков.
          </p>
        </div>

        <div className={styles.imageContainer}>
          <img
            src="https://s.f.kz/prod/photo/8169/8168474_550.jpg"
            alt="bookworm"
          />
        </div>

        <div className={styles.textBlock}>
          <h3>Доктор, я болен абиблиофобией</h3>
          <p>
            Уже давно понятно, что самых разных фобий — бесчисленное количество,
            но есть и такая, которая связана с книгами! И нет, это не страх
            книг, а страх того, что книги, которые можно прочесть, закончатся.
            Кажется, настоящим книжным червям это может быть знакомо.
          </p>
        </div>
      </div>
    </div>
  );
}
