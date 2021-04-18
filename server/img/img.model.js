// const mongoose = require('mongoose');
// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');
//
// const { upload } = require('../../config/config.js');
//
// const Types = mongoose.Schema.Types;
//
// const ImgSchema = new mongoose.Schema({
//   path: {
//     type: Types.String,
//     required: true
//   },
//   update_time: {
//     type: Types.Number,
//   },
//   create_time: {
//     type: Types.Number,
//   },
//   status: {
//     type: Types.Boolean,
//     required: true
//   },
//   owner_id: {
//     type: Types.ObjectID,
//     ref: 'puzzle_user'
//   }
// });
//
// const storage = multer.diskStorage({
//   destination(req, res, cb) {
//     req.nowTime = Date.now();
//     req.imgPath = `${upload.storeTo}${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getHours()}/${new Date().getMinutes()}/${new Date().getSeconds()}`;
//     const newPath = path.join(__dirname, `${upload.publicPath}${req.imgPath}`);
//     fs.mkdirSync(newPath, { recursive: true });
//     cb(null, newPath);
//   },
//   filename(req, file, cb) {
//     cb(null, `${req.nowTime}.jpg`);
//   }
// });
//
// const limits = {
//   // fields: 10, // 非文件字段的数量
//   fileSize: 1024 * 1000, // 文件大小 单位 b
//   files: 1 // 文件数量
// };
//
// function fileFilter(req, file, cb) {
//   if (file.mimetype === 'image/png') {
//     cb(null, true);
//   } else if (file.mimetype === 'image/jpg') {
//     cb(null, true);
//   } else if (file.mimetype === 'image/jpeg') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// }
//
// const imgMulter = multer({
//   storage,
//   limits,
//   fileFilter
// });
//
// module.exports = {
//   Img: mongoose.model('Img', ImgSchema),
//   imgMulter
// };
