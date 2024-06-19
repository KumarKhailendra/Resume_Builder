const { mongooseConnect } = require("@/dbConfig/dbConfig");
const { default: Users_k } = require("@/models/userModel");
const { createAccessToken } = require("@/utils/authConfig");
const jwt = require("jsonwebtoken");
const { NextResponse } = require("next/server");
const dynamic = 'force-dynamic';

async function POST(request) {
    await mongooseConnect();
    try {
        const rf_token = request.cookies.get('refreshtoken').value
        if (!rf_token) return NextResponse.json({msg: "Please login now."}, { status: 400 })
        
        const result = await new Promise((resolve, reject) => {
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                if (err) reject(err);
                else resolve(decoded);
            });
        });

        const user = await Users_k.findById(result.id)
        if (!user) return NextResponse.json({msg: "This user does not exist."}, { status: 400 })
        
        const access_token = createAccessToken({id: result.id})

        return NextResponse.json({
            access_token,
            user
        }, { status: 200 });
        
    } catch (err) {
        return NextResponse.json({msg: err.message}, { status: 500 });
    }
}

module.exports = { POST, dynamic };
