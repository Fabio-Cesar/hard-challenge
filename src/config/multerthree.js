import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/uploads/character')
    },
    filename: function (req, file, cb) {
        const extensaoArquivo = file.originalname.split('.').slice(-1)[0];
        const novoNomeArquivo = req.params.characterID;
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    }
});

function imageFilter(req, file, cb) {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        req.invalidFile = true;
        cb(null, false, req.invalidFile);
    }
    cb(null, true);
};

const upload = multer({ storage, fileFilter : imageFilter });

export default upload;