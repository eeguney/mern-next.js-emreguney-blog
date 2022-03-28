import pkg from "formidable";
const { IncomingForm } = pkg
import mv from "mv"

export const config = {
  api: {
    bodyParser: false,
  },
};

export const upload = async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      var oldPath = files.file.filepath;
      var newPath = `./public/uploads/${files.file.originalFilename}`;
      mv(oldPath, newPath, function (err) {});
      res.status(200).json({ fields, files });
    });
  });
};
