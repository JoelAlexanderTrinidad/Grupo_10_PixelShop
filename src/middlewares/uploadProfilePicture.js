const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/images');
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage
});


/* const upload = multer({
  storage,
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    }  else {
      next({ messageImg: "El tipo de archivo no es válido" }, false);
    } 
  }
});
 */
module.exports = upload;