'use strict';

const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let category = new Schema({
    name: {
        type: String,
        required: [true, "类目名必须有"],
        unique: [true, "类目名必须唯一"]
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("category", category);