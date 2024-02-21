
const productsMoudal = require('../modeal/products.modeal');

exports.getHome = (req, res, next) => {


    // Extracting the category from the request query
    let category = req.query.catergory;
    // If category is specified and not equal to "all"
    if (category && category !== "all") {
        // Filter products based on the specified category
        productsMoudal.filterproducts("filter", category, (err, produts) => {
            if (err) {
                // Log and send an error response if there's an error
                next(err);
            }
            // Render the index view with the filtered products and user's picture
            res.render('index', { 
                produts: produts,
                isAdmin:req.session.isAdmin,
                isUser: req.session.userId ,
                image:req.session.passport?req.session.passport.user.picture:false,
                pagetitale: "Home"
            });
        });
    } 
    else {
        productsMoudal.getallproducts((err, products) => {
            if (err) {
                // Log the error
                next(err);
            }
         
            // Render the index view with all products, user session information, and image URL
            res.render('index', {
                produts: products,            // Passing products data to the view
                isUser: req.session.userId,  // Passing user session information to the view
                image:req.session.passport?req.session.passport.user.picture:false,
                isAdmin:req.session.isAdmin,                // Passing the image URL to the view
                pagetitale: "Home"
            });
        });
        
    }
}

