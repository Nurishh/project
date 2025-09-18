
import { useUserBooks } from "../hooks/useUserBooks";
import { BookGrid } from "../BookGrid/BookGrid";
import styles from "./Favorite.module.scss";

export const Favorite = () => {
  const { books, loading, refresh } = useUserBooks("favorite");

  if (loading) return <div className={styles.loading}>Загрузка...</div>;

  return <BookGrid books={books} title="Любимые книги" />;
};
