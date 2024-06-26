const { default: mongoose } = require('mongoose')
const { DB_URI } = require('../config/config')

mongoose.connect(`${DB_URI}`).then(() => console.log('Db connection done')).catch(error => console.log('Error>>>>', error))

const db = {
    User: require('./user'),
    Agency: require('./agency'),

    Address: require('./address'),

    Products: require('./product/product'),
    ProductCategories: require('./category/productCategory'),
    Brands: require('./brand/brand'),

    
    WishLists: require('./wishList'),
    AddToCart: require('./addToCart'),
    
    Order: require('./order'),

}

module.exports = db