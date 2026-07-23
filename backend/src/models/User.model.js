import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Imię jest wymagnane'],
        trim: true,
        minlength: [2, 'Imię mieć co najmniej 2 znaki'],
        maxlength: [50, 'Imie może mieć maksymalnie 50 znaków']
    },
    email: {
        type: String,
        required: [true, 'E-mail jest wymagany'],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Podaj porawny adres e-mail']
    },
    password: {
        type: String,
        required: [true, 'Hasło jest wymagane'],
        minlength: [6, 'Hasło musi mieć co najmniej 6 znaków'],
        select: false
    },
    avatar: {
        type: String,
        default: null
    },
    currency: {
        type: String,
        default: 'PLN',
        enum: ['PLN', 'EUR', 'USD', 'GBP']
    },
    language: {
        type: String,
        default: 'pl',
        enum: ['pl', 'en']
    },
    theme: {
        type: String,
        default: 'light',
        enum: ['light', 'dark','system']
    },

    notifications: {
        email: {type: Boolean, default: true},
        push: {type: Boolean, default: true},
        budgetAlerts: {type: Boolean, default: true},
        weeklyReport: {type: Boolean, default: true}
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,

    lastLogin: Date,

    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

userSchema.index({email: 1});
userSchema.index({isActive: 1});

userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.resetPasswordToken;
  delete obj.resetPasswordExpire;
  return obj;
};

const User = mongoose.model('User', userSchema);

export default User;