// multer config to store image into our profile
/*
    To add an avatar to our api, we need to install muler, create a folder called tmp
    and a folder called uploads inside.
    Once our folders are created, we then move tou src/config to create this file: multer.js
    and put inside all code to store ours files.
*/
import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
    // store our content (images)
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
        filename: (req, file, cb) => {
            // how we format the name of our file
            crypto.randomBytes(16, (err, res) => {
                if (err) return cb(err);

                return cb(
                    null,
                    res.toString('hex', +extname(file.originalname))
                );
            });
        }
    })
};
