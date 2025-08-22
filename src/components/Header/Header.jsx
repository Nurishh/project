import styles from "./Header.module.scss";
// import logo from "../../../public/pmg.png";
import { useLocation, useNavigate } from "react-router-dom";
import {pages} from "./IconRouters"



export function Header() {
  const navigate = useNavigate();
  const {pathname} = useLocation()
  return (
    <header className={styles.header}>
      <nav>
        {pages.map((item, index) => (
          <span
            className={pathname === item.link ? styles.activeLink : ""}
            key={index}
            onClick={() => navigate(item.link)}>
            {item.title}
          </span>
        ))}
      </nav>
      <input
        className={styles.search}
        placeholder="поиск книг"
        type="поиск книг"
      />
    </header>
  );
}
