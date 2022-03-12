import multer from "multer";

// Configuración de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
      const filename = file.originalname.replace(" ", "-");
      const extension = filename.substring(filename.lastIndexOf('.') + 1);
      let d = new Date();
      var datestring = d.getFullYear() + "" + (d.getMonth()+1) + "" + d.getDate() + "" + d.getHours() + "" + d.getMinutes();
      cb(null, `${filename}-${datestring}.${extension}`);
    },
});

// Instancia de multer
const upload = multer({ storage });

// Export
export default upload;