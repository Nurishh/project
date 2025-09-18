import { useUserBooks } from "../hooks/useUserBooks";
import { BookGrid } from "../BookGrid/BookGrid";

export default function Finished() {
  const { books, loading, refresh } = useUserBooks("finished");

  if (loading) return <div>Загрузка...</div>;

  return <BookGrid books={books} title="прочитано" />;
}
