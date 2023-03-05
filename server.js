require('dotenv').conf();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
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
    getLikeController,
    likeController,
    deleteLikeController,
} = require('./controllers/like');

const {
    getCommentController,
    newCommentController,
    getSingleCommentController,
    deleteCommentController,
} = require('./controllers/comment');

const app = express();
 

app.use(cors());// unir front con backend
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
app.get('like/:id', getLikeController);
app.post('/like', likeController);
app.delete('/like/:id', deleteLikeController);

//Rutas Comment
app.get('/', getCommentController);
app.post('/', newCommentController);
app.get('/comment/:id', getSingleCommentController);
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

app.listen(3000, () => 
 console.log('Servidor funcionando!')
);