const jwt = require("jsonwebtoken");

const refreshAccessToken = async (req, res) => {
    try {

        // console.log('cookie', req.cookies.refreshToken)

        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh Token Not Found"
            });
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_SECRET_REFRESH
        );

        const newAccessToken = jwt.sign(
            { id: decoded.id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        res.status(200).json({
            success: true,
            accessToken: newAccessToken
        });

    } catch (error) {
        
        console.log("Refresh token error:", error.message);
        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Refresh Token"
        });
        
    }
};

module.exports = {refreshAccessToken}