// const {imgMulter, Img} = require('./img.model');
//
// async function get(req, res, next, id) {
//   const findImg = await Img.findOne({_id: id});
//   const _url = findImg.path;
//   res.json({
//     message: 'success',
//     url: _url
//   });
// }
//
// function post(req, res) {
//   const Multer = imgMulter.single('img');
//   Multer(req, res, (err) => {
//     if (err) {
//       return res.json({message: "error"});
//     } else {
//       const file = req.file;
//       const img = new Img({
//         path: `${req.imgPath}/${req.nowTime}.jpg`,
//         update_time: req.nowTime,
//         create_time: req.nowTime,
//         owner_id: req.session._id,
//         status: true,
//       });
//       img.save();
//
//       if (!file) {
//         return res.json({message: "error"});
//       } else {
//         return res.json({message: "success", id: img._id});
//       }
//     }
//   });
// }
//
// async function getUrl(id) {
//   let getImg, url;
//
//   if (Array.isArray(id)) {
//     const _urls = [];
//     for (let i = 0; i < id.length; i++) {
//       getImg = await Img.findOne({_id: id[i]});
//       url = getImg.path;
//       _urls.push(url);
//     }
//     return _urls;
//   } else {
//     getImg = await Img.findOne({_id: id});
//     if (getImg) {
//       url = getImg.path;
//       console.log(url)
//       return url;
//     } else {
//       return '';
//     }
//   }
// }
//
// module.exports = {
//   get,
//   post,
//   getUrl
// };
