//Passport gestionará los Tokens
import passport from "passport";
import jwt from "passport-jwt";
import jwt from "jsonwebtoken"; //Se puede desencriptar, evitar guardar info sensible

const JWTStrategy = jwt.Strategy;

export const initializePassport = () => {
    passport.use("jwtAuthenticate", new JWTStrategy(
    {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), //Se extrae la informacion encriptada del Token en la Cookie
        secretTokenKey: config.token.secretKeyToken, //La funcion de el extractor usa la clave para verificar si es correcto y tomar el token
    },
        async (jwtPayload, done) => { // la informacion del token queda en el "Payload" y se activa el usuario.
            try {
                return done(null, jwtPayload);
            } catch (error) {
                return done(error);
            }
        }
    ));
}

//Función para extraer el Token de la Cookie
const cookieExtractor = (req) => {
    let token;
    if(req && req.cookies){
        token = req.cookies["cookieToken"]; //Se toma la cookie y se almacena en la variable "token"
    } else {
        token = null;
    }
    return token;
};