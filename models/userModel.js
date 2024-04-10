const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');


const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

// static signup method
userSchema.statics.signup = async function(username,email, password) {

    // validation
    if(!email || !password || !username){
        throw Error("Username, Email and password are required")
    }
    if(!validator.isEmail(email)){
        throw Error("Email is invalid")
    }
    // if(!validator.isStrongPassword(password)){
    //     throw Error("Password is not strong enough")
    // }

    const exists=await this.findOne({email})
    if(exists){
        throw Error("Email already exists")
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user=await this.create({username,email,password:hashedPassword})
    return user


}

// static login method

userSchema.statics.login = async function(email, password) {
    
        // validation
        if(!email || !password){
            throw Error("Email and password are required")
        }
        
        const user=await this.findOne({email})
        if(!user){
            throw Error("Email does not exist")
        }
        const auth=await bcrypt.compare(password,user.password)
        if(!auth){
            throw Error("Password is incorrect")
        }
        return user

}


const User = mongoose.model('user', userSchema);

module.exports = User;