const { generateError } = require('../helpers');
const { getLikeById, deleteLikeById } = require('../db/photo');

const newLikeController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await getLikeById(id);

    res.send({
      status: 'ok',
      message: user,
    });
  } catch (error) {
    next(error);
  }
};

const deleteLikeController = async (req, res, next) => {
  try {
    // req.userId
    const { id } = req.params;

    const like = await getLikeById(id);

    if (req.userId !== like.user_id) {
      throw generateError(
        'Estas intentando borrar un like que no es tuyo',
        401
      );
    }

    await deleteLikeById(id);

    res.send({
      status: 'ok',
      message: `El like con id: ${id} ha sido eliminado`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newLikeController,
  deleteLikeController,
};
