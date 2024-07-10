const mongoose = require('mongoose');
const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [],
    price: {
        type: Number
    }
})
const Item = mongoose.model("Item", itemSchema);
module.exports = Item;