'use server'
import { cookies } from 'next/headers'
const { NextResponse } = require("next/server");
const dynamic = 'force-dynamic';

async function POST(request) {
    try {
        cookies().set({
            name: "refreshtoken",
            value: " ",
            maxAge: 0 
        });
        return NextResponse.json({msg: "Logged out!"}, { status: 200 })
    } catch (err) {
        return NextResponse.json({msg: err.message}, { status: 500 });
    }
}

module.exports = { POST, dynamic };
