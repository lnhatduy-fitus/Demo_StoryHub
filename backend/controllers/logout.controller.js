const logoutAuth = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        secure: true,
        samesite: 'lax',
    });
    res.status(200).json({
        message: "Logout successfull"
    });
}

export default logoutAuth;
