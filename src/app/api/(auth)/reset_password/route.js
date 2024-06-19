'use server'
import Users_k from '@/models/userModel';
const { NextResponse } = require("next/server");
const dynamic = 'force-dynamic';

async function POST(request) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody;
        await Users_k.findOneAndUpdate({email}, {password});
        return NextResponse.json({ msg: "Reset Password Success!." }, { status: 200 });
    } catch (err) {
        return NextResponse.json({msg: err.message}, { status: 500 });
    }
}

module.exports = { POST, dynamic };
