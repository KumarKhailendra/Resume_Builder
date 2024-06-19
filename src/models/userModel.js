const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: [true, "Please add your first name"],
        trim: true,
      },
    lname: {
        type: String,
        required: [true, "Please add your last name"],
        trim: true,
      },
    username: {
        type: String,
        required: [true, "Please add your username"],
        trim: true,
      },
      email: {
        type: String,
        required: [true, "Please add your email"],
        trim: true,
        unique: true
      },
      password: {
        type: String,
        required: [true, "Please add your password"]
      },
      securitykey: {
        type: String,
        required: [true, "Please add your security key"]
      },
      securityans: {
        type: String,
        required: [true, "Please add your security key"]
      },
      mobile: {
        type: Number,
        required: [true, "Please add your Number"]
      },
      level:{
        type: Number,
        default: 10
      },
      otp: {
        type: Number
      },
}, {
    timestamps: true
});

const Users_k = mongoose.models.users || mongoose.model("users", userSchema);

export default Users_k;
