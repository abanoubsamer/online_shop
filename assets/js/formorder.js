document.addEventListener('DOMContentLoaded', function() {
    // Retrieve favorite cards from localStorage
    let favoriteKeys = Object.keys(localStorage);

    // Get the container element where favorite products will be displayed
    let favoriteContainer = document.getElementById('favorite-products');

    // Loop through each key (which represents a user's set of favorite cards)
    favoriteKeys.forEach(function(key) {
        let favoriteCards = JSON.parse(localStorage.getItem(key));

        // Loop through the favorite cards and generate HTML for each card
        favoriteCards.forEach(function(card) {
            let cardHtml = `
            <div class="d-flex align-items-center mb-4">
           <div class="me-3 position-relative">
             <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary">
               1
             </span>
             <img src="/${card.image}" style="height: 96px; width: 96x;" class="img-sm rounded border" />
           </div>
           <div class="">
             <a href="/product/${card.id}" class="nav-link">
               Gaming Headset with Mic <br />
               Darkblue color
             </a>
             <div class="price text-muted">Total: $295.99</div>
           </div>
         </div>
            `;
            // Append the HTML for the card to the container
            favoriteContainer.innerHTML += cardHtml;
        });

    });
});

const purchaseButton = document.getElementById('Purchase');
purchaseButton.addEventListener('click', () => {
    // Get the product ID from the element with ID 'product'
    const productId = document.getElementById('product').value;
  
    // Remove the item from localStorage using the product ID as the key
    localStorage.removeItem(productId);
});