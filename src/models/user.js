const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error('Password must not contain password')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String, 
            required: true
        }
    }]
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner',
})

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'privatekey')

    user.tokens = user.tokens.concat({ token })
    await user.save();

    return token;
}

userSchema.methods.getPublicProfile = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password
    delete userObject.tokens

    return userObject;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne( {email} );

    if(!user) {
        throw new Error("Error: The email doesn't exist");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        throw new Error("Error: The password doesn't work");
    }

    return user;
}

//Delete uesr task when user is removed
userSchema.pre('remove', async function(next){
    const user = this;
    await Task.deleteMany({ owner: user._id })
    next();
})

// Hash the plain text password before saving
userSchema.pre('save', async function(next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})

const User = mongoose.model('User', userSchema)

module.exports = User;