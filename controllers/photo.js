const getPhotoController = async (req, res, next) => {
    try {
    res.send({
     status: 'error',
     message: 'Not implemented'
    });
  } catch(error) {
    next(error);
  }

};

const newPhotoController = async (req, res, next) => {
    try {
        res.send({
         status: 'error',
         message: 'Not implemented'
        });
      } catch(error) {
        next(error);
      }
};

const getSinglePhotoController = async (req, res, next) => {
    try {
        res.send({
         status: 'error',
         message: 'Not implemented'
        });
      } catch(error) {
        next(error);
      }
};

const deletePhotoController = async (req, res, next) => {
    try {
        res.send({
         status: 'error',
         message: 'Not implemented'
        });
      } catch(error) {
        next(error);
      }
};

module.exports = {
    getPhotoController,
    newPhotoController,
    getSinglePhotoController,
    deletePhotoController,
};
