
const jwt = require('jsonwebtoken');
// Refresh access token
const renewToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    let exist = false;
    if (!refreshToken) {
        return false;
    } else {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, (error, decoded) => {
            if (error) {
                return false;
            } else {
                const accessToken = jwt.sign({ email: decoded.email, userId: decoded.userId },
                    process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '15m' });
                res.cookie('accessToken', accessToken, { maxAge: 900000 });
                exist = true;
            }
        })
    }
    return exist;
}

module.exports = {
    // Verify current user
    verifyUser: (req, res, next) => {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            if (renewToken(req, res) !== true) {
                return res.json({ message: 'Unverified!' });

            } else {
                return next();
            }
        } else {
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY, (error, decoded) => {
                if (error) {
                    return res.json({ message: 'Unverified!' });
                } else {
                    req.email = decoded.email;
                    req.userId = decoded.userId;
                    return next();
                }
            })
        }
    },




}