const db = require("../config/ConnectDB");
const userModel = db.user;

const inserts = async (req, res) => {
    try {
        const { body: { name, email, password } } = req;
        const add = await userModel.create({ name, email, password });
        res.status(201).json({ success: true, data: add });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error at insert" })
    }
}

const viewAll = async (req, res) => {
    try {
        const view = await userModel.findAll({});
        res.status(201).json({ success: true, data: view });
    } catch (error) {
        res.status(500).json({ success: false, msg: " Error at view" })
    }
}

const deletes = async (req, res) => {
    try {
        const { params: { id } } = req;

        const del = await userModel.destroy({ where: { id } });
        if (!del) {
            return res.status(400).json({ success: false, msg: `This data is not define at this id:-${id}` });
        }
        res.status(200).json({ success: true, msg: "This Data Delete Successfully", data: del });

    } catch (error) {
        res.status(500).json({ success: false, msg: " Error at delete" });
    }
}

const edit = async (req, res) => {
    try {
        const { params: { id } } = req;
        const edt = await userModel.findOne({ where: { id } });
        if (edt) {
            return res.status(200).json({ success: true, msg: "Data edit/View Successfully", data: edt });
        }
        return res.status(400).json({ success: false, msg: `This data is not define at this id:-${id}` });
    } catch (error) {
        res.status(500).json({ success: false, msg: " Error at edit" });
    }
}

const updateData = async (req, res) => {
    try {
        const { params: { id }, body: { name, email, password } } = req;
        const data = await userModel.update({ name, email, password }, { where: { id } });
        if (data) {
            return res.status(200).json({ success: true, data, msg: "Data Update Successfully" });
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: " Error at UpdateUser" });
    }
}
module.exports = { inserts, viewAll, deletes, edit, updateData };   