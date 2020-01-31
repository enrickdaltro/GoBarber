import File from '../models/File';

class FileController {
    async store(req, res) {
        // get data from file
        const { originalname: name, filename: path } = req.file;

        // create file in our db
        const file = await File.create({
            name,
            path
        });

        return res.json(file);
    }
}

export default new FileController();
