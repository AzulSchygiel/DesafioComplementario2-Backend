import Express from "express";
import cookieParser from "cookie-parser";
import { __dirname } from "./utils.js";
import path from "path";
import { generateToken, validateToken } from "./utils.js";
import passport from "passport"; //Passport por defecto usa Session
import { initializePassport } from "./config/passport.config.js";

const port = 8080;
const app = express();

//~~~~~~~~~~~~SE INSTALA~~~~~~~~~~~~~~~//
//npm i cookie-parser
//npm i passport passport-jwt

//~~~~~~~~~~~MIDDLEWARES~~~~~~~~~~~~~~~//
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")))

app.listen(port, () => console.log(`Server Funcionando en puerto ${port}`));

initializePassport();
app.use(passport.initialize());

//~~~~~~~~~~~~~TOKEN~~~~~~~~~~~~~~~//
app.post("/login", (req, res) => {
    const user = req.body; //Se pasa el usuario de la Base de Datos
    user.role = "user"; //Se define los roles
    const token = generateToken(user); //Genera el Token
    res.cookie("cookieToken", token, {httpOnly:true}).json({status:"success", message:"Login Exitoso"}); //Se guarda el Token en cookie que se podrá acceder mediante una petición
    //res.json({ status: "success", accessToken: token }); //Se responde al usuario
});

app.get("/perfil", authenticate("jwtAuthenticate", authorize("user"), {session:false}), (req, res) => { //Ruta en la que usaremos Passport para el Token en Cookie. Se define la Autenticacion y Autorizacion
    res.json({result:req.user});
});