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
                <div class="row gy-3">
                    <div class="col-lg-5">
                        <div class="me-lg-5">
                            <div class="d-flex">
                                <img src="${card.image}" class="border rounded me-3" style="width: 96px; height: 96px;" />
                                <div class="">
                                    <a href="/product/${card.id}" class="nav-link">${card.name}</a>
                                    <p class="text-muted">${card.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                        <div class="">
                            <select style="width: 100px; margin-left:-10%;" class="form-select quantity-select">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                        <div class="">
                            <text class="h6 total-amount">$${card.price}</text> <br />
                            <text class="text-muted text">$${card.price} / per item </text>
                        </div>
                    </div>
                    <div class="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                        <div class="float-md-end">
                            <a href="#" class="btn btn-warning shadow-0 buy-button" 
                                data-id="${card.id}">
                                Buy now
                            </a>
                            <a href="#!" class="btn btn-light border text-danger icon-hover-danger remove-btn"> Remove</a> 
                        </div>
                    </div>
                </div>
            `;
            // Append the HTML for the card to the container
            favoriteContainer.innerHTML += cardHtml;
        });
    });

    // Add event listeners to all "Buy now" buttons
    let buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(function(button) {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            
        
            let productId = button.getAttribute('data-id');
           
            
            // Get quantity
            let quantityInput = button.closest('.row').querySelector('.quantity-select');
            let quantity = quantityInput ? quantityInput.value : 1;
            
            // Construct URL with quantity and product details
            let url = `/oreder/form/${productId}/${quantity}`;
    
            // Redirect to the constructed URL
            window.location.href = url;
        });
    });

    // Add event listeners to all quantity-select elements
    let quantitySelects = document.querySelectorAll('.quantity-select');
    quantitySelects.forEach(function(select) {
        select.addEventListener('change', function() {
            updateTotalAmount(select);
        });
    });    

    // Add event listeners to all remove buttons
    let removeButtons = document.querySelectorAll('.remove-btn');
          removeButtons.forEach(function(button) {
             button.addEventListener('click', function() {
              // Find the closest row and get the product ID
             let cardId = button.closest('.row').querySelector('.buy-button').getAttribute('data-id');
             removeCardFromLocalStorage(cardId);
             // Remove the card's HTML element from the DOM
             button.closest('.row').remove();
    });
});
});

// Function to update total amount based on quantity selected
function updateTotalAmount(select) {
    let quantity = parseInt(select.value);
    let price = parseFloat(select.closest('.row').querySelector('.text').textContent.replace('$', '').trim());
    console.log(price);
    let total = quantity * price;
    select.closest('.row').querySelector('.total-amount').textContent = `$${total.toFixed(2)}`;
}

function removeCardFromLocalStorage(cardId) {
    localStorage.removeItem(cardId);
}