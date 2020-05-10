const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 4,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: "{VALUE} is not a valid email"
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        trim: true
    }
});