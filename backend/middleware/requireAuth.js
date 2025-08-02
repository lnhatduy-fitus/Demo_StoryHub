import { getSession } from "./session.js";

const requireAuth = async (req, res, next) => {

    try {
        const session = await getSession(req);

        if (session){
            return res.status(401).json({message: 'Unauthorized: Login required'});
        }

        req.user = session;
        next();
    } catch (err) {
        console.error(err);
        res.status(403).json({message: 'Forbiden'});
    };

}

export default requireAuth;