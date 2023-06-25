const jwt = require("jsonwebtoken");
const db = require("../config/ConnectDB");
const secret = 'zxmcasjkaasdfa6sd24+v64fd6g5456asc46srg&*%S$^DSR*&D$^*$Ews24s6f2465g2s64b51h566d3'


const checkAuthentcation = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, msg: "You are not authorized" })
    } else {
        try {
            const token = authorization.split(' ')[1]

            let isToken = await db.user_Session.findOne({
                where: {
                    token
                }
            });
            isToken = isToken.toJSON();
            if (!isToken) {
                return res.status(401).json({ success: false, msg: "unauthorized" });
            }
            jwt.verify(token, secret, (err, decode) => {
                if (err) {
                    console.log(err.message);
                }
                req.user = {
                    id: decode.id,
                    email: decode.email
                }
                next();
            });

        } catch (error) {
            return res.status(401).json({ success: false, msg: "Token invalid" });
        }
    }
}


module.exports = checkAuthentcation;    