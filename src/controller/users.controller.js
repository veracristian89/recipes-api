import User from "../model/mongodb/userDb.js";
import bcrypt from "bcrypt";
import {token} from '../services/jwt.js'
const saltRounds = 10;

const userController = {
  async registerUser(req, res) {
    const { userName, email, firstName, lastName } = req.body;

    const password = await bcrypt.hash(req.body.password, saltRounds);

    const data = {
      userName,
      email,
      firstName,
      lastName,
      password,
    };

    const newUser = new User(data);

    try {
      const result = await newUser.save();
      result
        ? res
            .status(201)
            .json({
              status: "success",
              message: "se registro con exito",
              data: result,
            })
        : res
            .status(404)
            .json({
              status: "unsuccess",
              message: "no se pudo registrar",
              data: result,
            });
    } catch (error) {
      res
        .status(500)
        .json({
          status: "unsuccess",
          message: `Error en el servidor: ${error}`,
        });
    }
  },

  async loginUser(req, res) {
    const user = await User.find().where({ email: req.body.email });
    console.log(user)
    if (!user.length) {
      return res
        .status(401)
        .json({ status: "unsuccess", message: `mail o contraseña incorrecto` });
    } 

    const hashedPassword = user[0].password
    const match = await bcrypt.compare(req.body.password, hashedPassword);
    if(!match){
        return res
        .status(401)
        .json({ status: "unsuccess", message: `mail o contraseña incorrecto` });
    }else{
        const accesToken =  await token.generateToken(user[0]);
        return res
        .status(200)
        .json({ status: "success", message: `autenticado como: ${user[0].userName}`, data: accesToken }); 
    }

  },
};

export default userController;
