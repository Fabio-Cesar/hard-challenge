import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/uploads/')
    },
    filename: function (req, file, cb) {
        const extensaoArquivo = file.originalname.split('.').slice(-1)[0];
        const novoNomeArquivo = req.userID;
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    }
});

const upload = multer({ storage });

export default upload;