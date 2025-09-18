import { useUserBooks } from "../hooks/useUserBooks";
import { BookGrid } from "../BookGrid/BookGrid";

export default function Wantread() {
  const { books, loading, refresh } = useUserBooks("wantToRead");

  if (loading) return <div>Загрузка...</div>;

  return <BookGrid books={books} title="хочу прочитать" />;
}