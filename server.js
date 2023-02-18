require('dotenv').conf();

const express = require('express');
const morgan = require('morgan');

const {
    newUserController,
    getUserController,
    loginController,
} = require('./controllers/users');

const app = express();

app.use(morgan('dev'));

//Rutas users

app.post('/users', newUserController);
app.get('user/:id', getUserController);
app.post('/login', loginController);

//Rutas users

app.get('/', getPhotoController);
app.post('/', newPhotoController);
app.get('/photo/:id', getPhotoController);
app.delete('/photo/:id', deletePhotoController);


//middleware de 404
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not found',
    });
});

// middleware de gestion de errores
app.use((error, req, res, next) => {
 console.error(error);

 res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message
 })
})

//lanzamos el serivdor

app.listen(3000, () => 
 console.log('Servidor funcionando!')
);