import jwt from "jsonwebtoken"; //Se puede desencriptar, evitar guardar info sensible
import path from "path";
import { fileURLToPath } from "url";


export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const generateToken = (user) => {
    const token = jwt.sign({username:user.username, email:user.email}, config.token.secretKeyToken, {expiresIn: "24h"});
    return token; //Se crea un Token para cuando el usuario se registre
  };

export const validateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]; //Función recibe el token de los Headers
  if(!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1]; //Solo nos interesa el Token

  if(token === null) return res.sendStatus(401);

  jwt.verify(token, config.token.secretKeyToken, (err, payload) =>{ //Función que verifica que el token sea valido, no haya sido modificado
    if(err) return res.sendStatus(403);
    req.user = payload;
    next();
  });

};