const { createComment } = require('../db/comment');
const { generateError } = require('../helpers');

const newCommentController = async (req, res, next) => {
  try {
    const { id } = req.userId; //esta es la id de usuario
    const { text, photoId } = req.body; //de aquí sacas el texto y la id de la foto

    //comprobar que existe una foto con el id photoId y si no dar un 404

    if (!text || text.length > 100) {
      throw generateError(
        'El comentario debe existir y ser menor de 100 caracteres',
        400
      );
    }

    const commentId = await createComment(id, photoId, text);

    res.send({
      status: 'ok',
      message: `Comentario con id: ${commentId} creado correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCommentController = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'Not implemented',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newCommentController,
  deleteCommentController,
};
