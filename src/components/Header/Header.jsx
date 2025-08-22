import styles from "./Header.module.scss";
import logo from "../../../public/pmg.png";

const iconIsHeader = [
  {
    link: "/",
    title: "главная",
    // iconImg: ""
  },
  {
    link: "/catalog",
    title: "каталог",
    // iconImg: "",
  },
  {
    link: "/onas",
    title: "о нас",
    // iconImg: "",
  },
  {
    link: "/mybook",
    title: "мои книги",
    // iconImg: "",
  },
];

export function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <img src={logo} alt="logo" />
        {iconIsHeader.map((icon, index) => (
          <a key={index} href={iconIsHeader.link}>
            {icon.title}
          </a>
        ))}
      </nav>
        <input className={styles.search} placeholder="поиск книг" type="поиск книг" />
    </header>
  );
}
