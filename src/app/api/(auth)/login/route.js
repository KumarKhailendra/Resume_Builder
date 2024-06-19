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
        const { email, password } = reqBody
        
        const user = await Users_k.findOne({email})
        if(!user) return  NextResponse.json({msg: 'This account does not exits.'}, { status: 400 });
    
        // if user exists
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) return  NextResponse.json({msg: "Password is incorrect."}, { status: 400 });
        
        const access_token = createAccessToken({id: user._id})
        const refresh_token = createRefreshToken({id: user._id})
        
        cookies().set({
            name: "refreshtoken",
            value: refresh_token,
            httpOnly: true,
            path: '/',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        return NextResponse.json({
            msg: 'Login Success!',
            access_token,
            user: {
                ...user._doc,
                password: ''
            }
        }, { status: 200 })

    } catch (err) {
        return NextResponse.json({msg: err.message}, { status: 500 });
    }
}

module.exports = { POST, dynamic };
