const {
  createPhoto,
  getAtllPhotos,
  getPhotoById,
  deletePhotoById,
} = require('../db/photo');
const path = require('path');
const { createPathIfNotExist, generateError } = require('../helpers');
const sharp = require('sharp');
const { nanoId } = require('nanoId');

const getPhotoController = async (req, res, next) => {
  try {
    const photos = await getAtllPhotos();

    res.send({
      status: 'ok',
      message: photos,
    });
  } catch (error) {
    next(error);
  }
};

const newPhotoController = async (req, res, next) => {
  console.log(req.headers);
  //const { id } = req.userId;

  try {
    let imageFileName;
    if (req.files.image) {
      //crear el path del directorio
      const uploadsDir = path.join(__dirname, '../uploads');
      console.log(uploadsDir);
      //crear el directorio si no existe
      await createPathIfNotExist(uploadsDir);
      // procersar la imagen
      const image = sharp(req.files.image.data);
      image.resize(1000);
      // guardo la imagen con un nombre aleatorio en el directorio uploads
      imageFileName = `${nanoId(24)}.jpg`;

      await image.toFile(path.join(uploadsDir, imageFileName));
    }

    const id = await createPhoto(req.userId, imageFileName);

    res.send({
      status: 'ok',
      message: 'New photo',
    });
  } catch (error) {
    next(error);
  }
};

const getSinglePhotoController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const photo = await getPhotoById(id);
    res.send({
      status: 'error',
      message: photo,
    });
  } catch (error) {
    next(error);
  }
};

const deletePhotoController = async (req, res, next) => {
  try {
    // req.userId
    const { id } = req.params;

    const photo = await getPhotoById(id);

    if (req.userId !== photo.user_id) {
      throw generateError(
        'Estas intentando borrar una foto que no es tuya',
        401
      );
    }

    await deletePhotoById(id);

    res.send({
      status: 'ok',
      message: `la foto con id: ${id} ha sido eliminada`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPhotoController,
  newPhotoController,
  getSinglePhotoController,
  deletePhotoController,
};
