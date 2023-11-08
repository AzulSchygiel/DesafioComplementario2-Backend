import passport from "passport";
import { Strategy } from "passport-jwt";

//~~~~~~~~VALIDACIÓN DE AUTENTICACIÓN~~~~~~~~//
export const authenticate = (Strategy) => {
    const passportAuthenticate = async(req,res,next) => {
        passport.passportAuthenticate(Strategy, {session:false}, (err, user, info) => {
            if(err) return next(err); //Callback donde se recibe los errores si no es valido el Token
            if(!user){
                return res.status(401).json({error:info.toString()}); //401 : Error de autenticación de los usuarios            
            }
            req.user = user;
            next();
        })(req, res, next)
    }
    return passportAuthenticate;
};

//~~~~~~~~VALIDACIÓN DE AUTORIZACIÓN~~~~~~~~//
//En las Rutas se puede definir los roles de los usuarios que tendran acceso a esa ruta
export const authorize = (role) => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).json({error:"USUARIO NO ENCONTRADO... registrese o inicie sesión"}); //Verificacion de que el usuario este registrado
        if (req.user.role !== role){ //Verificacion de que el usuario tenga el rol necesitado
            return res.status(403).json({error:"USUARIO NO TIENE PERMISO DE ACCESO"});
        };
        next();
    };
};