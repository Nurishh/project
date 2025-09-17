import AuthorPage from "../Pages/Admin/AdminAddBooks/Author/AuthorPaje";
// import ImageSwiper from "../Pages/Swiper/ImageSwiper";
import BookList from "./BookList";

export function Catalog() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {/* <ImageSwiper/> */}
      <AuthorPage/>
      <BookList />
    </div>
  );
}

// import { useEffect, useState } from "react";
// import BookList from "./BookList";
// import styles from "./Catalog.module.scss";

// const Catalog = () => {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [genres, setGenres] = useState([]);
//   const [selectedGenre, setSelectedGenre] = useState("all");
//   const [sortBy, setSortBy] = useState("title");
//   const [searchQuery, setSearchQuery] = useState("");

//   // Загрузка книг и извлечение жанров
//   useEffect(() => {
//     const loadBooks = async () => {
//       try {
//         const response = await fetch("http://localhost:3001/books");
//         const data = await response.json();
//         setBooks(data);
//         setFilteredBooks(data);

//         // Извлекаем все уникальные жанры
//         const allGenres = data.reduce((acc, book) => {
//           if (book.genre && Array.isArray(book.genre)) {
//             book.genre.forEach((genre) => {
//               if (!acc.includes(genre)) {
//                 acc.push(genre);
//               }
//             });
//           }
//           return acc;
//         }, []);

//         setGenres(allGenres.sort());
//       } catch (error) {
//         console.error("Ошибка загрузки книг:", error);
//       }
//     };

//     loadBooks();
//   }, []);

//   // Фильтрация и сортировка книг
//   useEffect(() => {
//     let result = [...books];

//     // Фильтрация по жанру
//     if (selectedGenre !== "all") {
//       result = result.filter(
//         (book) => book.genre && book.genre.includes(selectedGenre)
//       );
//     }

//     // Поиск по названию и автору
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       result = result.filter(
//         (book) =>
//           book.title.toLowerCase().includes(query) ||
//           book.author.toLowerCase().includes(query)
//       );
//     }

//     // Сортировка
//     switch (sortBy) {
//       case "title":
//         result.sort((a, b) => a.title.localeCompare(b.title));
//         break;
//       case "author":
//         result.sort((a, b) => a.author.localeCompare(b.author));
//         break;
//       case "year-new":
//         result.sort((a, b) => b.publishedYear - a.publishedYear);
//         break;
//       case "year-old":
//         result.sort((a, b) => a.publishedYear - b.publishedYear);
//         break;
//       case "rating":
//         result.sort((a, b) => b.rating - a.rating);
//         break;
//       default:
//         break;
//     }

//     setFilteredBooks(result);
//   }, [books, selectedGenre, sortBy, searchQuery]);

//   const handleGenreChange = (genre) => {
//     setSelectedGenre(genre);
//   };

//   const handleSortChange = (e) => {
//     setSortBy(e.target.value);
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const clearFilters = () => {
//     setSelectedGenre("all");
//     setSortBy("title");
//     setSearchQuery("");
//   };

//   return (
//     <div className={styles.catalog}>
//       <div className={styles.header}>
//         <h1>Каталог книг</h1>
//         <p>Найдено книг: {filteredBooks.length}</p>
//       </div>

//       {/* Панель фильтров */}
//       <div className={styles.filtersPanel}>
//         {/* Поиск */}
//         <div className={styles.searchBox}>
//           <input
//             type="text"
//             placeholder="Поиск по названию или автору..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             className={styles.searchInput}
//           />
//         </div>

//         {/* Сортировка */}
//         <div className={styles.sortBox}>
//           <label htmlFor="sort">Сортировка:</label>
//           <select
//             id="sort"
//             value={sortBy}
//             onChange={handleSortChange}
//             className={styles.sortSelect}>
//             <option value="title">По названию (А-Я)</option>
//             <option value="author">По автору (А-Я)</option>
//             <option value="year-new">По году (новые)</option>
//             <option value="year-old">По году (старые)</option>
//             <option value="rating">По рейтингу</option>
//           </select>
//         </div>

//         {/* Сброс фильтров */}
//         <button onClick={clearFilters} className={styles.clearButton}>
//           Сбросить фильтры
//         </button>
//       </div>

//       {/* Жанры */}
//       <div className={styles.genresSection}>
//         <h2>Жанры</h2>
//         <div className={styles.genreTags}>
//           <button
//             className={`${styles.genreTag} ${
//               selectedGenre === "all" ? styles.active : ""
//             }`}
//             onClick={() => handleGenreChange("all")}>
//             Все жанры
//           </button>

//           {genres.map((genre) => (
//             <button
//               key={genre}
//               className={`${styles.genreTag} ${
//                 selectedGenre === genre ? styles.active : ""
//               }`}
//               onClick={() => handleGenreChange(genre)}>
//               {genre}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Список книг */}
//       <div className={styles.booksSection}>
//         {filteredBooks.length === 0 ? (
//           <div className={styles.noResults}>
//             <h3>Книги не найдены</h3>
//             <p>Попробуйте изменить параметры поиска или выбрать другой жанр</p>
//             <button onClick={clearFilters} className={styles.clearButton}>
//               Показать все книги
//             </button>
//           </div>
//         ) : (
//           <BookList initialBooks={filteredBooks} />
//         )}
//       </div>

//       {/* Активные фильтры */}
//       {(selectedGenre !== "all" || searchQuery || sortBy !== "title") && (
//         <div className={styles.activeFilters}>
//           <h3>Активные фильтры:</h3>
//           <div className={styles.activeFiltersList}>
//             {selectedGenre !== "all" && (
//               <span className={styles.activeFilter}>
//                 Жанр: {selectedGenre}
//                 <button onClick={() => setSelectedGenre("all")}>×</button>
//               </span>
//             )}

//             {searchQuery && (
//               <span className={styles.activeFilter}>
//                 Поиск: "{searchQuery}"
//                 <button onClick={() => setSearchQuery("")}>×</button>
//               </span>
//             )}

//             {sortBy !== "title" && (
//               <span className={styles.activeFilter}>
//                 Сортировка:{" "}
//                 {sortBy === "author"
//                   ? "По автору"
//                   : sortBy === "year-new"
//                   ? "Новые first"
//                   : sortBy === "year-old"
//                   ? "Старые first"
//                   : "По рейтингу"}
//                 <button onClick={() => setSortBy("title")}>×</button>
//               </span>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Catalog;
