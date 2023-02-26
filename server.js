require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const {
    newUserController,
    getUserController,
    loginController,
} = require('./controllers/users');

const {
    getPhotoController,
    newPhotoController,
    getSinglePhotoController,
    deletePhotoController,
} = require('./controllers/photo');

const {
    newLikeController,
    deleteLikeController,
} = require('./controllers/like');

const {
    newCommentController,
    deleteCommentController,
} = require('./controllers/comment');

const app = express();

app.use(morgan('dev'));

//Rutas users

app.post('/users', newUserController);
app.get('user/:id', getUserController);
app.post('/login', loginController);

//Rutas photos

app.get('/', getPhotoController);
app.post('/', newPhotoController);
app.get('/photo/:id', getSinglePhotoController);
app.delete('/photo/:id', deletePhotoController);

//Rutas likes
app.post('/like', newLikeController);
app.delete('/like/:id', deleteLikeController);

//Rutas Comment
app.post('/comment', newCommentController);
app.delete('/comment/:id', deleteCommentController);


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
const PORT = 4000;
app.listen(PORT, () => 
 console.log(`Servidor funcionando en http://localhost:${PORT}`)
);