import FileModel from './csv.schema.js';

export const findAllCsvRepo = async () => {
  try {
    return await FileModel.find();
  } catch (err) {
    throw new Error('Error fetching files: ' + err.message);
  }
};

export const createCsvRepo = async (data) => {
  try {
    const file = new FileModel({
      fileName: data.originalname,
      filePath: data.path,
      file: data.filename,
    });
    return await file.save();
  } catch (err) {
    throw new Error('Error creating file: ' + err.message);
  }
};

export const getCsvFile = async (id) => {
  try {
    return await FileModel.findOne({ file: id });
  } catch (error) {
    throw new Error('Error getting file: ' + err.message);
  }
};

export const delCsvFile = async (id) => {
  try {
    let isFile = await FileModel.findOneAndDelete({ file: id });
    if (isFile) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error('Error getting file: ' + err.message);
  }
};
