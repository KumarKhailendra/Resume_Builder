'use server'
import Users_k from '@/models/userModel';
import sendMail from '@/services/emailBuilder';
import { generateOTP } from '@/utils/authConfig';
const { NextResponse } = require("next/server");
const dynamic = 'force-dynamic';

async function POST(request) {
    try {
        const reqBody = await request.json()
        const { email } = reqBody
        const user = await Users_k.findOne({email})
        if(!user) return res.status(400).json({msg: 'This account does not exits.'})
        const otp = generateOTP();
        await Users_k.findOneAndUpdate({email}, {otp:otp});

        sendMail(email, otp);

        return NextResponse.json({
            msg: "Email are send"
        }, { status: 200 });

    } catch (err) {
        return NextResponse.json({msg: err.message}, { status: 500 });
    }
}

module.exports = { POST, dynamic };
