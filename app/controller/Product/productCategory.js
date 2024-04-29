const { ProductCategories } = require("../../model");
const { handleResponse, handleError, getPagination } = require("../../utils/helper");
const { productCategorySchema, updateProductCategorySchema } = require("../validator/productCategoryJoiSchema");

exports.create = async (req, res) => {
    try {
        const { name, description, parentCategoryID, subCategoriesID, } = req.body

        const { error } = productCategorySchema.validate(req.body, { abortEarly: false });

        if (error) {
            handleError(error, 400, res);
            return;
        };
        const data = { name, description, parentCategoryID, subCategoriesID, }

        const newProductCategory = new ProductCategories(data);

        await newProductCategory.save();

        handleResponse(res, newProductCategory._doc, 'Product category has been successfully created.', 201);

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
            ]
        } : {};

        const category = await ProductCategories.find({ ...searchFilter }).populate('parentCategoryID').populate('subCategoriesID')


        const totalCount = await ProductCategories.countDocuments()

        const getPaginationResult = await getPagination(req.query, category, totalCount);

        handleResponse(res, getPaginationResult, 200)

    } catch (error) {
        handleError(error, 400, res)
    };
};

exports.findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await ProductCategories.findOne({ _id: id })
        handleResponse(res, { ...category._doc }, 'Fetched product category successfully', 200)
    } catch (error) {
        handleError(error, 400, res)
    };
};

exports.updateProductCategory = async (req, res) => {
    try {
        const { name, description, parentCategoryID, subCategoriesID, } = req.body
        const { error } = updateProductCategorySchema.validate(req.body, { abortEarly: false })

        if (error) {
            handleError(error, 400, res)
            return;
        }

        const { id } = req.params;
        const category = await ProductCategories.findOne({ _id: id })

        if (!category) {
            handleError('Invailid product category ID', 400, res);
            return;
        }

        const data = { name, description, parentCategoryID, subCategoriesID, }

        await ProductCategories.updateOne({ _id: category._id }, data, { new: true })

        handleResponse(res, [], 202, 'Product category has been successfully updated.')
    } catch (error) {
        handleError(error, 400, res)
    };
};

exports.removeProductCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await ProductCategories.findOne({ _id: id })

        if (!category) {
            handleError('Invailid product category ID.', 400, res)
            return;
        };

        await ProductCategories.deleteOne({ _id: category._id });

        handleResponse(res, 'Product category has been successfully removed.', 200);

    } catch (error) {
        handleError(error, 400, res);
    };
};
