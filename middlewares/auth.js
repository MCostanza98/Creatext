const jwt = require('jsonwebtoken');
const { generateError } = require("../helpers");

const authUser = (req, res, next) => {
    try { 
        
     const { authorization } = req.headers;

      if(!authorization) {
        throw generateError('Falta la cabecera de Autorizacion', 401);
      }

    //comprobamos el token correcto 
    let token;

     try {
        token = jwt.verify(authorization, process.env.SECRET);
     } catch {
        throw generateError('Token incorrecto', 401);
     }
    //metemos la info del token en la request para usarla en el controlador
   
    req.userId = token;
    //saltamos al controlador
     
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    authUser,
}