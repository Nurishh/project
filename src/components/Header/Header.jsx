import styles from "./Header.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { pages } from "./IconRouters";
import { useState, useEffect, useRef } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:3001";

export function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      const q = encodeURIComponent(search.trim());

      //  только книжки с нужными полями
      fetch(`${API}/books?q=${q}`)
        .then((res) => (res.ok ? res.json() : []))
        .then((books) => {
          // Форматируем результаты для отображения
          // не работает проверить чорт
          const formattedResults = books.map((book) => ({
            type: "book",
            id: book.id,
            title: book.title,
            author: book.author,
            cover: book.cover,
            rating: book.rating,
            year: book.publishedYear,
          }));
          setResults(formattedResults);
        })
        .catch((err) => {
          console.error("Search error:", err);
          setResults([]);
        })
        .finally(() => setLoading(false));
    }, 350);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setResults([]);
        setSearch("");
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const onItemClick = (item) => {
    setSearch("");
    setResults([]);
    navigate(`/book/${item.id}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
      setSearch("");
      setResults([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className={styles.header} ref={wrapperRef}>
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

      <div className={styles.searchContainer}>
        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
          <input
            className={styles.search}
            placeholder="поиск по книгам, авторам и жанрам"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* {user && (
            <div className={styles.userBlock}>
              <span className={styles.userName}>{user.name}</span>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Выйти
              </button>
            </div>
          )} */}
        </form>

        {/* Выпад список  */}
        {search && (loading || results.length > 0) && (
          <div className={styles.searchResults}>
            {loading ? (
              <div className={styles.searchItem}>Загрузка...</div>
            ) : results.length === 0 ? (
              <div className={styles.searchItem}>Ничего не найдено</div>
            ) : (
              results.slice(0, 5).map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className={styles.searchItem}
                  onClick={() => onItemClick(item)}>
                  <div className={styles.resultContent}>
                    <img
                      src={item.cover}
                      alt={item.title}
                      className={styles.resultImage}
                      // onError={(e) => {
                      //   e.target.src =
                      //     "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA0MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjIwIiB5PSIzMCIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMTIiPk5vIGltYWdlPC90ZXh0Pgo8L3N2Zz4=";
                      // }}
                    />
                    <div className={styles.resultInfo}>
                      <div className={styles.resultTitle}>{item.title}</div>
                      <div className={styles.resultAuthor}>{item.author}</div>
                      <div className={styles.resultMeta}>
                        <span className={styles.resultYear}>{item.year}</span>
                        <span className={styles.resultRating}>
                          ★ {item.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {/* {user && (
        <div className={styles.userBlock}>
          <span className={styles.userName}>{user.name}</span>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Выйти
          </button>
        </div>
      )} */}
    </header>
  );
}
