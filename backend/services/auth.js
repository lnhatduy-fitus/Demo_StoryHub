import {SignJWT, jwtVerify} from "jose";

import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

export const encrypt = async (payload) => {

    return await new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(key);

}

export const decrypt = async (input) => {

    const {payload} = await jwtVerify(input, key,{
        algorithms: ['HS256'],
    });
    return payload;

}