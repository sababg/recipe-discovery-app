# SBA-10 Recipe Discovery App

## Reflections

1: The design is the challenging part for me.

2: Using favorites in a Context provider backed by a reusable useLocalStorage hook, instead of having each page/component manage favorites and localStorage reads/writes on its own. useLocalStorage keep in sync behavior and returns a React state tuple just like useState, but persisted.
FavoritesProvider uses that hook to store only favoriteIds: string[] (not whole recipe objects), and exposes small helper functions (addFavorite, removeFavorite, isFavorite) via context. With this I prevent duplicating logic. By storing IDs instead of the whole recipe, we will reduce the stored data size.

#

👤 Author
Saba Beigi
🌎 Charlotte, NC
💼 GitHub @sababg
📧 beigisaba@gmail.com

Feel free to reach out with questions, feedback, or ideas!
