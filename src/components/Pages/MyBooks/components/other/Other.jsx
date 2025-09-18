import { useUserBooks } from "../hooks/useUserBooks";
import { BookGrid } from "../BookGrid/BookGrid";

export default function Other() {
  const { books, loading, refresh } = useUserBooks("other");

  if (loading) return <div>Загрузка...</div>;

  return <BookGrid books={books} title="другое" />;
}
