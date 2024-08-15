import User from "../model/mongodb/userDb.js";
import bcrypt from "bcrypt";
import { token } from "../services/jwt.js";
import logger from "../services/winstonLogger.js";
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
        ? res.status(201).json({
            status: "success",
            message: "se registro con exito",
            data: result,
          })
        : res.status(404).json({
            status: "unsuccess",
            message: "no se pudo registrar",
            data: result,
          });
    } catch (error) {
      res.status(500).json({
        status: "unsuccess",
        message: `Error en el servidor: ${error}`,
      });
    }
  },

  async loginUser(req, res) {
    const incomingEmail = req.body.email;
    const incomingPassword = req.body.password;

    if (!incomingEmail || !incomingPassword) {
      logger.warn("Login fallido por falta de datos");
      return res
        .status(401)
        .json({ status: "unsuccess", message: `faltan datos` });
    }
    const user = await User.find().where({ email: incomingEmail });
    if (!user.length) {
      logger.warn("loggin fallido: email incorrecto o inexistente");
      return res
        .status(401)
        .json({ status: "unsuccess", message: `mail o contraseña incorrecto` });
    }

    const hashedPassword = user[0].password;
    const match = await bcrypt.compare(incomingPassword, hashedPassword);
    if (!match) {
      logger.warn("Login fallido: contraseña incorrecta");
      return res
        .status(401)
        .json({ status: "unsuccess", message: `mail o contraseña incorrecto` });
    } else {
      const accesToken = await token.generateToken(user[0]);
      logger.info(`Usuario autenticado: ${user[0].userName}`);
      return res
        .status(200)
        .json({
          status: "success",
          message: `autenticado como: ${user[0].userName}`,
          data: accesToken,
        });
    }
  },
  async getById(req, res) {
    const { id } = req.params;
    let user = await User.findById(id);
    user
      ? res
          .status(200)
          .json({ status: "success", message: "usuario por id", data: user })
      : res
          .status(404)
          .json({ status: "unsuccess", message: "no se encuentra el usuario" });
  },
};

export default userController;
