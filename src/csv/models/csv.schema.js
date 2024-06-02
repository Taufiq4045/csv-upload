import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
    },
    filePath: {
      type: String,
    },
    file: {
      type: String,
    },
  },
  {
    timestamps: {
      options: { timeZone: 'Asia/Kolkata' },
    },
  }
);

const FileModel = mongoose.model('Files', fileSchema);

export default FileModel;
