import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true
    },

}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

export default Category;