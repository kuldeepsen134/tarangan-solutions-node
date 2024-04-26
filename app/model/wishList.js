const mongoose = require("mongoose")
const { Schema } = mongoose

const wishListSchema = Schema({
    quantity: {
        type: Number,
        required: true
    },
    product_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },

    user_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},
    {
        timestamps: true
    })


module.exports = mongoose.model("WishList", wishListSchema)