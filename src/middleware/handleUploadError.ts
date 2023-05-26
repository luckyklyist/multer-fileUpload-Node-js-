import multer from "multer";
import { Request,Response,NextFunction } from "express";

const handleUploadError = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File too large. Maximum file size allowed is 5MB.' });
        }
        else {
            return res.status(400).json({ message: err.message });
        }
    }
    else if (err.message === 'Not supported file extensions') {
        return res.status(400).json({ message: 'Not supported file extensions' })
    }
    else if (err) {
        console.log(err.message)
        return res.status(400).json({ message: 'File upload failed.' });
    }
    next(err);
};

export default handleUploadError;

