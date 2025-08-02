import { connection } from "../database/postgresDB.js";
import { decrypt } from "../services/auth.js";

const getAuthorComic = async (req, res) => {

    const token = req.cookies?.token;
    if (!token){
        res.status(500).json({message: 'Unauthorized'});
    }

    const payload = await decrypt(token);
    const id = payload?.id;

    try {
        const result = await connection.query(
            'SELECT * FROM sp_get_author_comics($1)', [id]
        );
        res.status(200).json(result.rows);

    }catch (err){
        console.log(err);
        res.status(400).json({message: {err}});
    }

}

export default getAuthorComic;