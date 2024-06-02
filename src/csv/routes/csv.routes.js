import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  upload as _upload,
  home,
  view,
  del,
} from '../controllers/csv.controller.js';

const csvRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/files');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
    cb(null, true);
  } else {
    cb(new Error('Only CSV files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

csvRouter.route('/').get(home);
csvRouter.route('/upload').post(upload.single('file'), _upload);
csvRouter.route('/view/:id').get(view);
csvRouter.route('/delete/:id').get(del);

export default csvRouter;
