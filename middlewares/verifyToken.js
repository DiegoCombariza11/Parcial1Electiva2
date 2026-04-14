import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({
      state: false,
      message: "JWT_SECRET no esta configurado"
    });
  }

  const authHeader = req.headers.authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      state: false,
      message: "Token no proporcionado"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    return next();
  } catch (error) {
    return res.status(401).json({
      state: false,
      message: "Token invalido o expirado"
    });
  }
};

export default verifyToken;
