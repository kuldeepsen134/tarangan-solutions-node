const jwt = require('jsonwebtoken');
const { handleResponse, handleError } = require('../utils/helper');
const { JWT_SECREATE, JWT_EXPIRESIN } = require('../config/config');
const { Agency } = require('../model');

// Agency can sign-up
exports.create = async (req, res) => {
    try {
        const { agency_name, primary_agency_name, agency_mobile, agency_linkediURL, agency_websiteURL, designation, agency_linked_employees, agency_email, password, } = req.body;
       
        const data = { agency_name, primary_agency_name, agency_mobile, agency_linkediURL, agency_websiteURL, designation, agency_linked_employees, agency_email, password, role: 'agency' };

        const token = jwt.sign({ data }, JWT_SECREATE, { expiresIn: JWT_EXPIRESIN });

        const newAgency = new Agency(data);

        await newAgency.save();

        const datad = { ...newAgency._doc, token }

        handleResponse(res, datad, 201);

    } catch (error) {
        if (error.code === 11000) {
            handleError('This email is already exists.', 400, res)
            return
        }
        handleError(error.message, 400, res)
    };
};