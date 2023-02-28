const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateError} = require('../helpers');
const { createUser, getUserById, getUserByEmail } = require('../db/users');

const newUserController = async (req, res, next) => {
try {
  const { email, password } = req.body;
  
  // 

  if (!email || !password) {
    throw generateError('Debes introducir un email y una contraseña', 400);
  }

  const id = await createUser(email,password);
  console.log(id);

   res.send({
    status: 'Oki',
    message: `User created with id: ${id}`,
   });
 } catch(error) {
   next(error);
 }
};

const getUserController = async (req, res, next) => {try {
    const { id } = req.params;

    const user = await getUserById(id);

    res.send({
     status: 'ok',
     message: user,
    });
  } catch(error) {
    next(error);
  }

};

const loginController = async (req, res, next) => 
   {try {
     const { email, password } = req.body;

     if(!email || !password) {
      throw generateError('Debes enviar un email y una password');
     }
     
     // recojo los datos de la base de datos del usuario con ese email
     const user = await getUserByEmail(email);

     // Compruebo que las claves coincidan
     const validPassword = await bcrypt.compare(password, user.password);

     if(!validPassword) {
      throw generateError('La constraseña no coincide', 401);
     }


     // Creo que playload del token
     const payload = { id: user.id };

     // Firmo el token
     const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: '30d',
     });


     // Envio el token
    
     res.send({
     status: 'error',
     data: token,
    });
  } catch(error) {
    next(error);
  }

};

module.exports = {
    newUserController,
    getUserController,
    loginController,
};