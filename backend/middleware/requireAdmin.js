import { decrypt } from "../services/auth.js";

const requireAdmin = async (req, res, next) => {
    const token = req.cookies?.auth_token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {

        const payload = await decrypt(token);

        if (payload.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Admins only' });
        }

        req.user = payload;
        next();
    }catch (err){
        console.error({err});
        return res.status(400).json({message: "Invalid token"});
    }
}