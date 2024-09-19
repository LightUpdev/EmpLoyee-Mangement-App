const dotenv = require("dotenv");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpeg", "png", "jpg"],
    public_id: (req, file) => file.originalname.split(".")[0] + "",
  },
});

const cloudinaryFileUploader = multer({ storage: storage });

module.exports = {
  cloudinaryFileUploader,
};
