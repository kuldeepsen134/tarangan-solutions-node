const Joi = require('joi');

// Joi schema for product category
const productCategorySchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    parentCategory: Joi.string().allow('').allow(null), 
    subcategories:Joi.array().items(Joi.string().allow(null).allow(''))
});


const updateProductCategorySchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    parentCategory: Joi.string().allow('').allow(null), 
    subcategories:Joi.array().items(Joi.string().allow(null).allow(''))
});

module.exports = {
    productCategorySchema,
    updateProductCategorySchema
};
