import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export const token = {

  async generateToken(user) {
    const userForToken = {
      email: user.email,
      userName: user.userName,
    };

    return jwt.sign(userForToken, process.env.JWT_SECRET, { expiresIn: "1m" });
  },

  async verifyToken(req, res, next) {
    const token = req.headers?.authorization?.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res
            .status(401)
            .json({ status: "unsuccess", message: `token ivalido` });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res
        .status(401)
        .json({ status: "unsuccess", message: `falta token` });
    }
  },
};
