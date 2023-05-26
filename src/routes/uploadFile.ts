import express, { Request, Response, NextFunction } from "express";
import multer from 'multer';
import fs from 'fs';
import handleUploadError from '../middleware/handleUploadError';
import storage from '../config/storageConfig';

const router = express.Router();

const upload = multer({
    storage,
    fileFilter: function (req: Request, file, cb) {
        const allowedFileExtensions = ['jpeg', 'png', 'jpg'];
        const fileExtensions = file.originalname.split('.').pop();
        if (allowedFileExtensions.includes(`${fileExtensions}`)) {
            cb(null, true);
        }
        else {
            cb(new Error("Not supported file extensions"));
        }

    },
    limits: {
        fileSize: 5 * 1024 * 1024,
    }
})

router.get("/", (req, res) => {
    const files = fs.readdirSync("./uploads");
    const fileLinks = files.map((file) => ({
        filename: file,
        link: `/uploads/${file}`,
    }));
    res.render("index", { fileLinks });
});


router.post('/', upload.single('fileName'), (req: Request, res: Response) => {
    console.log(req.file);
    console.log(req.body);
    res.json(req.file);
});

router.get("/:filename", (req: Request, res: Response) => {
    const { filename } = req.params;
    res.sendFile(filename, { root: "./uploads" });
});

// Error handling middleware
router.use(handleUploadError);

module.exports = router;

