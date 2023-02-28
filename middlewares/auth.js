const { generateError } = require("../helpers");

const authUser = (req, res, next) => {
    try { 
        
     const { authorization } = req.headers;
      if(!authorization) {
        throw generateError('Falta la cabecera de Autorizacion', 401);
      }
     
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    authUser,
}