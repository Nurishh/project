// // Предполагается, что у тебя есть доступ к данным через fetch или импорт

// async function updateBooks() {
//   try {
//     // Загружаем данные из db.json
//     const response = await fetch("http://localhost:3001/books");
//     const books = await response.json();

//     // Обновляем каждую книгу, добавляя поле status
//     const updatedBooks = books.map((book) => ({
//       ...book,
//       status: book.status || "none", // Если статус не указан, ставим 'none'
//     }));

//     // Сохраняем обновлённые данные обратно
//     await fetch("/path/to/db.json", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedBooks),
//     });

//     console.log("Книги успешно обновлены!");
//   } catch (error) {
//     console.error("Ошибка при обновлении книг:", error);
//   }
// }

// // Вызов функции
// updateBooks();
