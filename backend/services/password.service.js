import argon2, { argon2id } from 'argon2';

export const passwordHash = async (password) => {
  try {
    const hashed = await argon2.hash(password, {
      type: argon2id,
      timeCost: 4,
      memoryCost: 2 ** 16,
      parallelism: 2,
    });
    return hashed;
  } catch (err) {
    console.error('Hashing error:', err);
    throw err;
  }
};

export const verifyPassword = async (hash, password) => {
  try {
    // console.log("Hash:", hash);
    // console.log("Password:", password);

    return await argon2.verify(hash, password);
  } catch (err) {
    console.error('Verification error:', err);
    return false;
  }
};

