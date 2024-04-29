const { Brands } = require("../../model");
const { handleResponse, handleError, getPagination } = require("../../utils/helper");
const { brandSchema } = require("../validator/brandJoiSchema");

exports.create = async (req, res) => {
    try {
        const { name, description, originCountry, } = req.body;

        const { error } = brandSchema.validate(req.body, { abortEarly: false });

        if (error) {
            handleError(error, 400, res);
            return;
        };

        const data = { name, description, originCountry }

        const newBrand = new Brands(data);

        const savedBrand = await newBrand.save();

        handleResponse(res, savedBrand._doc, 'Your Brand has been successfully created.', 201)

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

        const brand = await Brands.find({ ...searchFilter })

        const totalCount = await Brands.countDocuments()

        const getPaginationResult = await getPagination(req.query, brand, totalCount);

        handleResponse(res, getPaginationResult, 200)

    } catch (error) {
        handleError(error, 400, res)
    };
};

exports.findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const brand = await Brands.findOne({ _id: id })
        handleResponse(res, {...brand._doc}, 'Fetched brand successfully', 200)
    } catch (error) {
        handleError(error, 400, res)
    };
};


exports.updateBrand = async (req, res) => {
    try {
        const { name, description, originCountry, } = req.body;
        const { error } = updateProductSchema.validate(req.body, { abortEarly: false })

        if (error) {
            handleError(error, 400, res)
            return;
        }

        const { id } = req.params;
        const brand = await Brands.findOne({ _id: id })

        if (!brand) {
            handleError('Invailid brand ID', 400, res);
            return;
        }

        const data = { name, description, originCountry }

        await Brands.updateOne({ _id: id }, data, { new: true })

        handleResponse(res, [], 202, 'Brand has been successfully updated.')
    } catch (error) {
        handleError(error, 400, res)
    };
};


exports.removeBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const brand = await Brands.findOne({ _id: id })

        if (!brand) {
            handleError('Invailid brand ID.', 400, res)
            return
        }

        await Brands.deleteOne({ _id: brand._id })

        handleResponse(res, 'Brand has been successfully removed.', 200)

    } catch (error) {
        handleError(error, 400, res)
    };
};
