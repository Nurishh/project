import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { pagesBook } from "./MyBookRouters";
import styles from "./MyBook.module.scss";
import { useEffect, useState } from "react";

export function MyBooks() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [booksCount, setBooksCount] = useState({});
  const [user, setUser] = useState(null);
  const [showLogout, setShowLogout] = useState(false);

  // Загружаем юзера и колич книг
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user-data"));
      if (!userData) return;

      setUser(userData);

      const res = await fetch(`http://localhost:3001/users/${userData.id}`);
      const userFromServer = await res.json();

      const counts = {};
      Object.keys(userFromServer.myBooks || {}).forEach((section) => {
        counts[section] = userFromServer.myBooks[section].length;
      });

      setBooksCount(counts);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user-data");
    navigate("/login");
  };

  const handleMouseEnter = () => {
    setShowLogout(true);
  };

  const handleMouseLeave = () => {
    setShowLogout(false);
  };

  return (
    <div className={styles.wrapper}>
      <div>
        {user && (
          <div
            className={styles.userBlock}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <span className={styles.userName}>{user.name}</span>
            {showLogout && (
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Выйти
              </button>
            )}
          </div>
        )}
        <ul className={styles.navMenu}>
          {pagesBook.map((item, index) => {
            const section = item.link.split("/").pop();
            const count = booksCount[section] || 0;

            return (
              <li
                key={index}
                className={`${styles.navItem} ${
                  pathname === item.link ? styles.activeLink : ""
                }`}
                onClick={() => navigate(item.link)}>
                {item.title} ({count})
              </li>
            );
          })}
        </ul>
      </div>

      <Outlet />
    </div>
  );
}
