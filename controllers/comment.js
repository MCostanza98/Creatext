const { createComment } = require('../db/comment');
const { generateError } = require('../helpers');
const { getCommentById, deleteCommentById } = require('../db/photo');

const newCommentController = async (req, res, next) => {
  try {
    const { id } = req.userId;
    const { text, photoId } = req.body;

    if (!text || text.length > 100) {
      throw generateError(
        'El comentario debe existir y ser menor de 100 caracteres',
        400
      );
    }

    if (req.files) {
      //
    }

    const commentId = await createComment(id, text, photoId);

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
    // req.userId
    const { id } = req.params;

    const comment = await getCommentById(id);

    if (req.userId !== comment.user_id) {
      throw generateError(
        'Estas intentando borrar un comentario que no es tuyo',
        401
      );
    }

    await deleteCommentById(id);

    res.send({
      status: 'ok',
      message: `El like con id: ${id} ha sido eliminado`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newCommentController,
  deleteCommentController,
};
