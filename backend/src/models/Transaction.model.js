import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true,
    },
    currency: {
        type: String,
        required: true,
        default: 'PLN',
    },
    category: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
        index: true,
    },
    source: {
        type: String,
        enum: ['manual', 'bank'],
        default: 'manual',
        required: true,
    },
    note: {
        type: String,
        trim: true,
        maxlength: 500,
    },
    bankTransactionId: {
        type: String,
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
}, {
    timestamps: true
});

transactionSchema.index({ userId: 1, date: -1});
transactionSchema.index({userId: 1, category: 1});
transactionSchema.index(
    {userId: 1, bankTransactionId: 1},
    {unique: true, sparse: true}
)

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;