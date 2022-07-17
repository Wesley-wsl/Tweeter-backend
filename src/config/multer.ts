import { Options } from "multer";
import { resolve } from "path";

import { storage } from "./cloudinary";

const uploadsDest = resolve(__dirname, "../../uploads");

const multerConfig: Options = {
    dest: uploadsDest,
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
    fileFilter: (request, file, callback) => {
        const formats = ["image/jpeg", "image/png", "image/jpg"];

        if (formats.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error("Format not accepted."));
        }
    },
};

export default multerConfig;
