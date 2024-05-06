const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const { Schema } = mongoose

const agencySchema = Schema({
  agency_name: {
    type: String,
    required: true
  },
  primary_agency_name: {
    type: String,
    required: true
  },
  agency_mobile: {
    type: String,
    required: true
  },
  agency_linkediURL: {
    type: String,
    required: true

  },
  agency_websiteURL: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  agency_linked_employees: {
    type: Number,
    required: true
  },
  agency_email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: [8, 'Must be at least 6 characters password'],
    required: true,
  },
  role: {
    type: String,
    enum: ['agancy', 'admin',],
    default: 'agancy',
    required: true,
  },

  token: {
    type: String,
  },
},
  {
    timestamps: true
  })

agencySchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

agencySchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


module.exports = mongoose.model("Agancy", agencySchema)