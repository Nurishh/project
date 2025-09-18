
// const API_BASE = "http://localhost:3001";

// export const collectionService = {
//   // Добавить книгу в коллекцию
//   addToCollection: async (userId, bookId, collectionType) => {
//     try {
//       const response = await fetch(`${API_BASE}/userCollections`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId,
//           bookId,
//           collectionType,
//           addedAt: new Date().toISOString(),
//         }),
//       });

//       if (!response.ok) throw new Error("Ошибка добавления в коллекцию");
//       return await response.json();
//     } catch (error) {
//       console.error("Ошибка:", error);
//       throw error;
//     }
//   },

//   // Получить коллекции пользователя
//   getUserCollections: async (userId) => {
//     try {
//       const response = await fetch(
//         `${API_BASE}/userCollections?userId=${userId}`
//       );
//       if (!response.ok) throw new Error("Ошибка загрузки коллекций");
//       return await response.json();
//     } catch (error) {
//       console.error("Ошибка:", error);
//       return [];
//     }
//   },

//   // Удалить книгу из коллекции
//   removeFromCollection: async (userId, bookId, collectionType) => {
//     try {
//       // Здесь нужно реализовать логику удаления
//       // Это зависит от структуры вашего API
//       const response = await fetch(
//         `${API_BASE}/userCollections?userId=${userId}&bookId=${bookId}&collectionType=${collectionType}`,
//         {
//           method: "DELETE",
//         }
//       );

//       return response.ok;
//     } catch (error) {
//       console.error("Ошибка:", error);
//       return false;
//     }
//   },
// };
