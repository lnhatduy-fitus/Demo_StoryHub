import { encrypt, decrypt } from "../services/auth.js";

export const getSession = async (req) => {
    const sessionTok = req.cookies?.session;

    if (!sessionTok) return null;

    try {
        const session = await decrypt(sessionTok);
        return session;
    } catch (err){
        console.error(err);
        return null;
    }
};

export const refreshSession = async (req, res, next) => {
    const sessionTok = req.cookies?.session;

    if (!sessionTok) return next();

    try {
        const parsed = await decrypt(sessionTok);
        parsed.expires = new Date(Date.now() + 60 * 60 * 1000);
        const encrypted = await encrypt(parsed);

        res.cookie('session', encrypted, {
            httpOnly: true,
            expires: parsed.expires,
        });

        next();
    } catch (err){
        next();
    }
};