import { useUserBooks } from "../hooks/useUserBooks";
import { BookGrid } from "../BookGrid/BookGrid";

export default function Dropped() {
  const { books, loading, refresh } = useUserBooks("abandoned");

  if (loading) return <div>Загрузка...</div>;

  return <BookGrid books={books} title="брошено" />;
}
