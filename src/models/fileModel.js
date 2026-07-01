const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema(
    {
        filename : {type : String},
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

const fileModel = mongoose.model('filename', DataSchema)
module.exports = fileModel