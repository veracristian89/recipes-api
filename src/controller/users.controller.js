import  User  from "../model/mongodb/userDb.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

const userController = {

    async registerUser(req, res) {

        const { userName,
            emil,
            firstName,
            lastName 
        } = req.body;

        const password = await bcrypt.hash(req.body.password, saltRounds);

        const data = {
            userName,
            emil,
            firstName,
            lastName,
            password
        }

        const newUser = new User(data);

        try {
            const result = await newUser.save();
            result?
            res.status(200).json({ status: 'success', message: 'se registro con exito', data: result }):
            res.status(404).json({ status: 'unsuccess', message: 'no se pudo registrar', data: result })
        } catch (error) {
            res.status(500).json({ status: 'unsuccess', message: `Error en el servidor: ${error}` });
        }


    }

};

export default userController;