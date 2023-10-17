import multer from 'multer';
import path   from 'path';

const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, callback) {
    callback(null, path.parse(file.originalname).name + '-' + Date.now() + path.extname(file.originalname));
  }
});

export const upload = multer({ storage: storage });
