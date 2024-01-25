const imageDownloader = require('image-downloader');
const fs = require('fs');

module.exports = {
    // Upload a photo by a given link
    uploadPhotoByLink: async (req, res) => {
        try {
            const { link } = req.body;
            if (link.match(/\.(jpeg|jpg|png)$/) === null) {
                return res.status(415).json({
                    message: 'Invalid link!'
                })
            }
            const newName = 'photo' + Date.now() + '.jpg';
            const serverPath = __dirname.split('server')[0] + 'server';
            await imageDownloader.image({
                url: link,
                dest: serverPath + '/uploads/' + newName
            });
            res.status(200).json({
                message: 'Image uploaded successfully!',
                image: newName
            })
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong! :('
            })
        }

    },
    // Upload an image file
    uploadPhoto: (req, res) => {
        try {
            let uploadedFiles = [];
            const filtered = req.files.filter(f => f.mimetype === 'image/png' || f.mimetype === 'image/jpeg' || f.mimetype === 'image/jpg');
            if (filtered.length !== req.files.length) {
                return res.status(415).json({
                    message: 'Invalid data format!'
                });
            }
            for (let i = 0; i < req.files.length; i++) {
                const { path, originalname } = req.files[i];
                const parts = originalname.split('.');
                const ext = parts[parts.length - 1];
                let newPath = path + '.' + ext;
                fs.renameSync(path, newPath);
                uploadedFiles.push(newPath.replace('uploads\\', ''));
            }
            res.status(200).json({
                message: 'Photo uploaded successfully!',
                photos: uploadedFiles
            })
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong! :('
            })
        }

    },
    // Delete an image file
    removePhoto: (req, res) => {
        const { photo } = req.params;
        const fileName = __dirname.split('server')[0] + 'server\\uploads\\' + photo;
        try {
            fs.unlinkSync(fileName);
            res.status(200).json({
                message: 'Photo deleted successfully!'
            })
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong! :('
            })
        }

    }
}