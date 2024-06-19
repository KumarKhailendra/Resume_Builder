const { mongooseConnect } = require("@/dbConfig/dbConfig");
const { default: Users_k } = require("@/models/userModel");
const { createAccessToken, createRefreshToken } = require("@/utils/authConfig");
const bcrypt = require('bcrypt');
const { NextResponse } = require("next/server");
import { cookies } from 'next/headers'
const dynamic = 'force-dynamic';

async function POST(request) {
    await mongooseConnect();
    try {
        const reqBody = await request.json()
        const { fname, lname, username, email, password, securitykey, securityans, mobile, gender } = reqBody;
        
        const user = await Users_k.findOne({ email });
        
        if (user) return NextResponse.json({msg: 'Email already exists.'}, { status: 400 });
        if (password.length < 6) return NextResponse.json({msg: "Password must be at least 6 characters."}, { status: 400 });
        
        const passwordHash = await bcrypt.hash(password, 12);
        
        const newUser = new Users_k({ fname, lname, username, email, password: passwordHash, securitykey, securityans, mobile, gender });
        
        const access_token = createAccessToken({id: newUser._id});
        const refresh_token = createRefreshToken({id: newUser._id});
        
        cookies().set({
            name: "refreshtoken",
            value: refresh_token,
            httpOnly: true,
            path: '/',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });
        
        await newUser.save();
        console.log("newUser>>>>>>>", newUser);

        

        return NextResponse.json({
            msg: 'Register Success!',
            access_token,
            user: {
                ...newUser._doc,
                password: ''
            }
        }, { status: 200 })

    } catch (err) {
        return NextResponse.json({msg: err.message}, { status: 500 });
    }
}

module.exports = { POST, dynamic };
