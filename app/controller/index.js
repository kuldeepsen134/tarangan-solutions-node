module.exports = {
    auth: require('./auth'),
    users: require('./user'),
    addresses: require('./address'),

    brands: require('./Product/brand'),
    productCategories: require('./Product/productCategory'),
    products: require('./Product/product'),

    wishLists: require('./wishlist'),

    addTocarts: require('./addToCart'),

    orders: require('./order'),
}