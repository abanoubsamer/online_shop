

$(document).ready(function() {
    $('.au-btn--submit2').click(function(e) {
        e.preventDefault();
        var searchText = $('.au-input--w300').val().trim().toLowerCase();
        if (searchText === "") {
            // If the search input is empty, show all rows
            $('#ttable tr.tr-shadow').show();
        } else {
            // Hide all rows
            $('#ttable tr.tr-shadow').hide();
            // Show only the rows that match the search text
            $('#ttable tr.tr-shadow').each(function() {
                var email = $(this).find('.block-email').text().toLowerCase();
                if (email.indexOf(searchText) !== -1) {
                    $(this).show();
                }
            });
        }
    });
});

    $(document).ready(function() {
        $('.address-select').change(function() {
            var selectedProperty = $('[name="property"]').val();
            var selectedTime = $('[name="time"]').val();

            $('#ttable tr.tr-shadow').hide(); // Hide all rows initially
            
            // Filter rows based on selected property and time
            $('#ttable tr.tr-shadow').each(function() {
                var rowProperty = $(this).find('td:nth-child(4)').text().trim(); // Assuming the property column is the fourth column
                var rowDate = $(this).find('td:nth-child(5)').text().trim(); // Assuming the date column is the fifth column

                var currentDate = new Date();
                var orderDate = new Date(rowDate);

                var timeDiff = Math.abs(currentDate - orderDate);
                var diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                 console.log(diffDays) 
                if ((selectedProperty === "All Properties" || rowProperty === selectedProperty) &&            
                    (selectedTime==='All'||
                    (selectedTime ==="1"&& diffDays <= 1) ||
                    (selectedTime === "2" && diffDays <= 2) ||
                    (selectedTime === "7" && diffDays <= 7) ||
                    (selectedTime === "30" && diffDays <= 30)))
                {
                    $(this).show();
                }
            });
        });
    });





//read
document.addEventListener('DOMContentLoaded', function() {
    var section = document.getElementById('dataTableSection');
    section.scrollIntoView({ behavior: 'smooth' });
});



let ProductName=document.getElementById('Product-Name');
let Productid=document.getElementById('Product-id');
let Email=document.getElementById('Email');
let status=document.getElementById('status');
let phone=document.getElementById('phone');
let Securitycode=document.getElementById('Securitycode');


function updateData() {
        let newdata = {
            productid:Productid.value,
            ProductName:ProductName.value,
            email:Email.value,
            status:+status.value,
            phone:phone.value
      }
      document.getElementById('newDataInput').value=JSON.stringify(newdata);
}




// scroll function
const scroll = () => {
    function scrollToTop() {
        window.scrollTo({
            top: 500,
            behavior: 'smooth'
        });
    }

    // Throttle scroll events to once every 200 milliseconds
    let throttleTimer;
    window.onscroll = function () {
        if (!throttleTimer) {
            throttleTimer = setTimeout(function () {
                throttleTimer = null;
            }, 200);
        }
    };
    scrollToTop();
};


//get data in form
function editOrder(order) {
    order=JSON.parse(order)
    Productid.value = order._id
     // Retrieve the order data using the index
     ProductName.value = order.productName; // Populate product name field
     Email.value = order.email; // Populate email field
     status.value = order.status; // Populate status field
     phone.value = order.phone; // Populate phone field
    // You can similarly populate other fields with their corresponding order data
    scroll();
}


function search()
{

}