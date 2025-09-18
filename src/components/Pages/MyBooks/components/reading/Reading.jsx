import { useUserBooks } from "../hooks/useUserBooks";
import { BookGrid } from "../BookGrid/BookGrid";

export default function Reading() {
  const { books, loading, refresh } = useUserBooks("readingNow");

  if (loading) return <div>Загрузка...</div>;

  return <BookGrid books={books} title="читаю сейчас" />;
}
