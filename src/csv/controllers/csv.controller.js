import fs from 'fs';
import csvParser from 'csv-parser';
import { ErrorHandler } from '../../../utils/errorHandler.js';
import {
  findAllCsvRepo,
  createCsvRepo,
  getCsvFile,
  delCsvFile,
} from '../models/csv.repository.js';

export const home = async (req, res, next) => {
  try {
    let files = await findAllCsvRepo();
    return res.render('home', {
      files: files,
      title: 'Home',
    });
  } catch (err) {
    return next(new ErrorHandler(400, err.message));
  }
};

export const upload = async (req, res, next) => {
  try {
    if (!req.file) {
      let files = await findAllCsvRepo();
      return res.render('home', {
        files: files,
        title: 'Home',
      });
    }
    if (req.file.mimetype != 'text/csv') {
      return next(new ErrorHandler(400, 'Select CSV files only.'));
    }
    await createCsvRepo(req.file);
    return res.redirect('/api/csv-upload/');
  } catch (err) {
    return next(new ErrorHandler(400, err.message));
  }
};

export const view = async (req, res, next) => {
  try {
    let csvFile = await getCsvFile(req.params.id);
    const results = [];
    const header = [];
    fs.createReadStream(csvFile.filePath)
      .pipe(csvParser())
      .on('headers', (headers) => {
        headers.forEach((head) => {
          header.push(head);
        });
      })
      .on('data', (data) => results.push(data))
      .on('end', () => {
        res.render('file_viewer', {
          title: 'File Viewer',
          fileName: csvFile.fileName,
          head: header,
          data: results,
          length: results.length,
        });
      });
  } catch (err) {
    return next(new ErrorHandler(400, err.message));
  }
};

export const del = async (req, res, next) => {
  try {
    let isFile = await delCsvFile(req.params.id);
    if (isFile) {
      return res.redirect('/api/csv-upload/');
    } else {
      next(new ErrorHandler(400, 'File not found'));
      return res.redirect('/api/csv-upload/');
    }
  } catch (err) {
    return next(new ErrorHandler(400, err.message));
  }
};
