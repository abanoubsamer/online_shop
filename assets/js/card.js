
function addToFavorites(card) {
    // Retrieve existing favorites from localStorage or initialize an empty array
    let favorites = JSON.parse(localStorage.getItem(card.id)) || [];

    // Check if the product is already in favorites
    const existingProductIndex = favorites.findIndex(item => item.id === card.id);


    if (existingProductIndex === -1) {
      // Product not found in favorites, add it
      card.Date= Date.now();
      favorites.push(card);
      // Update localStorage with the updated favorites list
      localStorage.setItem(card.id, JSON.stringify(favorites));

      // Optionally, provide user feedback
      alert('Product added to favorites!');
    } else {
      // Product already in favorites, provide user feedback
      alert('Product is already in favorites!');
    }
  }