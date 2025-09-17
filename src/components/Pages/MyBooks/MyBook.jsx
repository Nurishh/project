// MyBooks.tsx
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { pagesBook } from "./MyBookRouters";
import styles from "./MyBook.module.scss";

export function MyBooks() {
  const navigate = useNavigate();
  const { pathname } = useLocation();


 

  return (
    <div className={styles.wrapper}>
      <div>
        <ul className={styles.navMenu}>
          {pagesBook.map((item, index) => (
            <li
              key={index}
              className={`${styles.navItem} ${
                pathname === item.link ? styles.activeLink : ""
              }`}
              onClick={() => navigate(item.link)}>
              {item.title}
            </li>
          ))}
          {/* {updateBooks} */}
        </ul>
      </div>

      <Outlet />
    </div>
  );
}
