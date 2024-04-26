const { Products } = require("../../model");
const { handleError, handleResponse, getPagination } = require("../../utils/helper");
const { productSchema, updateProductSchema } = require("../validator/productJoiSchema");

exports.create = async (req, res) => {
    try {
        const { sku, name, description, price, quantity, categoryID, brandID, } = req.body

        const { error } = productSchema.validate(req.body, { abortEarly: false });

        if (error) {
            handleError(error, 400, res);
            return;
        };

        const data = { sku, name, description, price, quantity, categoryID, brandID, }

        const newProduct = new Products(data);

        await newProduct.save();

        handleResponse(res, data, 'Your product has been successfully created.', 201);


    } catch (error) {

        handleError(error, 400, res);
    }
};


exports.find = async (req, res) => {
    try {
        const { role, q } = req.query;
        const searchFilter = q ? {
            $or: [
                { name: { $regex: new RegExp(q, 'i') } },
                { sku: { $regex: new RegExp(q, 'i') } }
            ]
        } : {};

        const products = await Products.find({ ...searchFilter }).populate('categoryID',).populate('brandID',)


        const totalCount = await Products.countDocuments()

        const getPaginationResult = await getPagination(req.query, products, totalCount);

        handleResponse(res, getPaginationResult, 200)

    } catch (error) {
        handleError(error.message, 400, res)
    };
};



exports.findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findOne({ _id: id })
        handleResponse(res, {...product._doc}, 'Fetched product', 200)
    } catch (error) {
        handleError(error, 400, res)
    };
};


exports.updateProduct = async (req, res) => {
    try {
        const { sku, name, description, price, quantity, categoryID, brandID, } = req.body
        const { error } = updateProductSchema.validate(req.body, { abortEarly: false })

        if (error) {
            handleError(error, 400, res)
            return
        }

        const { id } = req.params;
        const product = await Products.findOne({ _id: id })

        if (!product) {
            handleError('Invailid product ID', 400, res);
            return;
        }

        const data = { sku, name, description, price, quantity, categoryID, brandID, }

        await Products.updateOne({ _id: product._id }, data, { new: true })

        handleResponse(res, [], 'Your product has been successfully updated.', 202,)
    } catch (error) {
        handleError(error, 400, res)
    };
};


exports.removeProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findOne({ _id: id })

        if (!product) {
            handleError('Invailid product ID.', 400, res)
            return
        }

        await Products.deleteOne({ _id: product._id })

        handleResponse(res, 'Product has been successfully removed.', 200)

    } catch (error) {
        handleError(error, 400, res)
    };
};
