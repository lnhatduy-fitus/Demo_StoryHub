// import { sql, connection } from '../database/userDB.js';
import { encrypt } from '../services/auth.js';
import {connection} from '../database/postgresDB.js';
import { verifyPassword, passwordHash } from '../services/password.service.js';

const loginAuth = async (req, res) => {
  const { username, password } = req.body; //body: username password

  // const hashedPassword = await passwordHash(password);

  try {
    const result = await connection.query(
      'SELECT * FROM sp_user_login($1)',
      [username]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];

      const payload = {
        id: user.userid,
        name: user.name,
        password: user.passwordhash,
        role: user.role,
        expires: new Date(Date.now() + 60 * 60 * 1000),
      };


      if (!(await verifyPassword(payload.password, password))){
        return res.status(401).json({message: "Incorrect password"});
      }

      const token = await encrypt(payload);

      res.cookie('token', token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        secure: false,
        sameSite: 'lax',
        expires:payload.expires,
      });

      res.status(200).json({
        message: "Login successful",
        isAdmin: payload.role === 'Admin',
      });
    } else {
      res.status(401).json({ message: "Login failed: Invalid credentials" });
    }

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export default loginAuth;
