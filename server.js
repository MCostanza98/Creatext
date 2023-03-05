require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
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

const { authUser } = require('./middlewares/auth');

const {
  newLikeController,
  deleteLikeController,
} = require('./controllers/like');

const {
  newCommentController,
  deleteCommentController,
} = require('./controllers/comment');

const app = express();

app.use(fileUpload());
app.use(morgan('dev'));
app.use(express.json());
app.use('/uploads', express.static('./uploads'));

//Rutas users

app.post('/users', newUserController);
app.get('user/:id', getUserController);
app.post('/login', loginController);

//Rutas photos

app.post('/', authUser, newPhotoController);
app.get('/', getPhotoController);
app.get('/photo/:id', authUser, getSinglePhotoController);
app.delete('/photo/:id', authUser, deletePhotoController);

//Rutas likes
app.post('/like', authUser, newLikeController);
app.post('/like', authUser, newLikeController);
app.delete('/like/:id', authUser, deleteLikeController);

//Rutas Comment
app.post('/comment', authUser, newCommentController);
app.delete('/comment/:id', authUser, deleteCommentController);

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
    message: error.message,
  });
});

//lanzamos el serivdor
const PORT = 4000;
app.listen(PORT, () =>
  console.log(`Servidor funcionando en http://localhost:${PORT}`)
);
