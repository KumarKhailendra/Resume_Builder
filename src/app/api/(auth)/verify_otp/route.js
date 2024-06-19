'use server'
import Users_k from '@/models/userModel';
const { NextResponse } = require("next/server");
const dynamic = 'force-dynamic';

async function POST(request) {
    try {
        const reqBody = await request.json()
        const { otp, email } = reqBody;
        const user = await Users_k.findOne({email})
        const isMatch = user.otp == otp;

        if(!isMatch) return NextResponse.json({ msg: "OTP is incorrect." }, { status: 400 })

        return NextResponse.json({ msg: "OTP verification is Success!." }, { status: 200 })

    } catch (err) {
        return NextResponse.json({msg: err.message}, { status: 500 });
    }
}

module.exports = { POST, dynamic };
