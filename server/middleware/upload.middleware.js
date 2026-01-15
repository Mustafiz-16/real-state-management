import multer from "multer";
import path from "path";

// storage config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // uploads folder
  },
  filename(req, file, cb) {
    cb(
      null,
      `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`
    );
  },
});

// file type check
function checkFileType(file, cb) {
  const extname = /jpg|jpeg|png|webp|pdf/.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimetype =
    file.mimetype.startsWith("image/") ||
    file.mimetype === "application/pdf";

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Allowed files: jpg, jpeg, png, webp, pdf"));
  }
}

// function checkFileType(file, cb) {
//   const filetypes = /jpg|jpeg|png|webp|pdf/;
//   const extname = filetypes.test(
//     path.extname(file.originalname).toLowerCase()
//   );
//   const mimetype = filetypes.test(file.mimetype);

//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
//     cb("Allowed files: jpg, jpeg, png, webp, pdf");

  
//     //cb("Images only! (jpg, jpeg, png, webp)");
//   }

// }

// multer upload
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

export default upload;
