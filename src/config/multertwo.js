import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/uploads/package')
    },
    filename: function (req, file, cb) {
        const extensaoArquivo = file.originalname.split('.').slice(-1)[0];
        const novoNomeArquivo = req.params.packageID;
        cb(null, `${novoNomeArquivo}`)
    }
});

function imageFilter(req, file, cb) {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        req.invalidFile = true;
        cb(null, false, req.invalidFile);
    }
};

const upload = multer({ storage, fileFilter : imageFilter });

export default upload;