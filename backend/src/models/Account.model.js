import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        bankName: {
            type: String,
            trim: true
        },
        icon: {
            type: String,
            default: '🏦'
        },
        color: {
            type: String,
            default: '#3B82F6'
        },
        type: {
            type: String,
            enum: ['checking', 'savings', 'credit', 'cash', 'investment', 'other'],
            default: 'checking'
        },
        currency: {
            type: String,
            default: 'PLN'
        },
        balance: {
            type: Number,
            required: true,
            default: 0
        },
        accountNumberLast4: {
            type: String,
            trim: true
        },
        source: {
            type: String,
            enum: ['manual', 'open_banking'],
            default: 'manual'
        },
        provider: {
            type: String, // 'gocardless'
            default: null
        },
        providerAccountId: {
            type: String,
            default: null
        },
        providerConnectionId: {
            type: String, // id sesji/requisition/zgody z bankiem
            default: null
        },
        lastSyncedAt: {
            type: Date,
            default: null
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

accountSchema.index({ user: 1, isActive: 1 });

const Account = mongoose.model('Account', accountSchema);

export default Account;