import dotenv from 'dotenv';
import cloudinary from './cloudinary.service.js';
import formidable from 'formidable';
import fs from 'fs/promises';

export const parseForm = (req) => {
    return new Promise ((resolve, reject) => {
        const form = formidable({
            // uploadDir: './tmp',
            multiples: true,
            // only image files and pdf file allowed to upload
            filter: ({mimetype, originalFilename}) => {
                const allowedType = ['image/jpeg', 'image/png', 'application/pdf']
                const allowedExten = ['.jpg', '.png', '.pdf', '.jpeg'];
                const exten = originalFilename?.toLowerCase().split('.').pop();
                return allowedType.includes(mimetype) && allowedExten.includes(`.${exten}`)
            },
            keepExtensions: true,
        });

        form.parse(req, (err, fields, files) => {
            if (err){
                return reject(err);
            }
            resolve({fields, files});
        });
    })
}

export const uploadCloud = async (comicName, chapter, imgFiles) => {
    
    // convert to array list if not
    if (!Array.isArray(imgFiles)){
        imgFiles = [imgFiles];
    }

    const url = [];

    for (const img of imgFiles){
        const res = await cloudinary.uploader.upload(img.filepath, {
            folder: `StoryHub_Lib/${comicName}/${chapter}`,
            allowed_formats: ["jpg", "png", 'pdf', 'jpeg'],
        });

        url.push(res.secure_url);
        await fs.unlink(img.filepath);
    }

    return url;

}

