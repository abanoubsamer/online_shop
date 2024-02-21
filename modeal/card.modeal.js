
    const mongoose = require('mongoose');
    const url="mongodb+srv://kokowawa123456:kokowawa123456@atlascluster.wh98haj.mongodb.net/onlineshope?retryWrites=true&w=majority";



    let SchemCard={
        name: String,
        price: Number,
        amount: Number,
        userId: String,
        productId: String,
        image: String,
        timeOrder: Number,

    }

    let Card=mongoose.model("card",SchemCard);


    exports.addCard = (data) => {
        return new Promise((resolve, reject) => {
            mongoose.connect(url)
                .then(() => {
                    return Card.findOne(
                        { userId: data.userId, productId: data.productId }
                    );
                })
                .then((result) => {
                    if (result) {
                        return Card.updateOne(
                            { userId: data.userId, productId: data.productId },
                            { $inc: { amount: data.amount } }
                        );
                    } else {
                        let newCard = new Card(data);
                        return newCard.save();
                    }
                })
                .then(() => {
                    mongoose.disconnect();
                    resolve();
                })
                .catch((err) => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    };


    exports.get_cart = (userId, callback) => {
        mongoose.connect(url)
            .then(() => {
                return Card.find({ userId: userId });
            })
            .then((cart) => {
                callback(null, cart);
                mongoose.disconnect();
            })
            .catch((err) => {
                mongoose.disconnect();
                callback(err, null);
            });
    };
    exports.delete_card = (cardId) => {

        return new Promise((resolve, reject) => {

            mongoose.connect(url)
            .then(() => {
                return Card.findByIdAndDelete(cardId);
            })
            .then((cart) => {
                resolve();
                mongoose.disconnect();
            })
            .catch((err) => {
                mongoose.disconnect();
                reject(err);
            });

        })
    

    }



 