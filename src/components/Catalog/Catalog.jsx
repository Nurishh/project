import BookList from "./BookList";
import AddBook from "./AddBook";

export function Catalog() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>📚 Каталог книг</h1>
      <AddBook />
      <BookList />
    </div>
  );
}
