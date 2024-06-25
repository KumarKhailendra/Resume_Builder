const { mongooseConnect } = require("@/dbConfig/dbConfig");
const { default: Users_k } = require("@/models/userModel");
const bcrypt = require('bcrypt');
const { NextResponse } = require("next/server");
const dynamic = 'force-dynamic';

async function PUT(request) {
    await mongooseConnect();
    try {
        const reqBody = await request.json();
        const { userId, fname, lname, email, mobile } = reqBody;
        
        const user = await Users_k.findById(userId);
        
        if (!user) return NextResponse.json({msg: 'User not found.'}, { status: 404 });
        
        if (fname) user.fname = fname;
        if (lname) user.lname = lname;
        if (email) user.email = email;
        if (mobile) user.mobile = mobile;
        
        await user.save();
        
        return NextResponse.json({
            msg: 'Update Success!',
            user: {
                ...user._doc,
                password: ''
            }
        }, { status: 200 });

    } catch (err) {
        return NextResponse.json({msg: err.message}, { status: 500 });
    }
}

module.exports = { PUT, dynamic };
