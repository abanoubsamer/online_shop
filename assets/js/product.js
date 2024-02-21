
//function inc & dec quantity  
   document.addEventListener('DOMContentLoaded', function() {
    
    const minusButton = document.getElementById('minus-button');
    const plusButton = document.getElementById('plus-button');
    const quantityInput = document.getElementById('quantity-input');

    // Event listener for the minus button
    minusButton.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        if (!isNaN(currentValue) && currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });
    
    // Event listener for the plus button
    plusButton.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        if (!isNaN(currentValue)) {
            quantityInput.value = currentValue + 1;
        } else {
            quantityInput.value = 1;
        }
    });
});



//  add fevoret fevoret 
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

/////////////////////////////////////////////////

   document.addEventListener("DOMContentLoaded", function() {

    let productId=document.getElementById("productId");
  
    
      document.getElementById("buy-now-btn")
        .addEventListener("click", function(event) {
           event.preventDefault(); // Prevent the default action of following the link

    
    // Get quantity
       let quantity = document.getElementById("quantity-input").value?document.getElementById("quantity-input").value:1;

    // Construct URL with quantity and product details
       var url = "/oreder/form/" + productId.value +"/"+ quantity;

    // Redirect to the constructed URL
    window.location.href = url;
});
});