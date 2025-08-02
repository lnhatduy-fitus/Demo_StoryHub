import {passwordHash} from "../services/password.service.js";
import { connection } from "../database/postgresDB.js";

const Register = async (req, res) => {
    // console.log('req.body:', req.body);
    const { username, email, password, role } = req.body;
    // console.log(password);

    try {
        const hashedPassword = await passwordHash(password);

        await connection.query(
            'SELECT sp_register_user($1, $2, $3, $4)',
            [username, email, hashedPassword, role]
        );

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Registration failed' });
    }
};

export default Register;
