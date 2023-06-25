const jwt = require("jsonwebtoken");
const db = require("../config/ConnectDB")
const userModel = db.user;
const bcrypt = require("bcrypt");

const secret = 'zxmcasjkaasdfa6sd24+v64fd6g5456asc46srg&*%S$^DSR*&D$^*$Ews24s6f2465g2s64b51h566d3';

const login = async (req, res) => {
    try {

        const { body: { email, password } } = req;

        const isAuth = await userModel.findOne({ where: { email } });
        if (!isAuth) {
            return res.status(404).json({ success: false, msg: "User Not Found" });
        }
        if (!bcrypt.compareSync(password, isAuth.password)) {
            return res.status(400).json({ success: false, msg: "Password Not Match" });
        }
        const payload = {
            id: isAuth.id,
            email: isAuth.email
        }
        const token = jwt.sign(payload, secret, { expiresIn: '1d' });

        await db.user_Session.create({ token: token, user_id: isAuth.id });

        res.status(200).json({ success: true, msg: "User Login Successfully", token: token });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, msg: "Error in server at Login" });
    }
}

const logout = async (req, res) => {
    try {
        const { user: { id } } = req;
        await db.user_Session.destroy({
            where :{user_id : id}
        });

        res.status(200).json({ success: true, msg: "Token Delete Successfully and User Logged out Successfully", });
       
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error in server at logout" + error.message });
    }
}

module.exports = { login, logout }