const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    let moduleFolder = req.body.module || 'default';
    let uploadPath = path.join(__dirname, `../public/uploads/${moduleFolder}`);

    // Create folder if doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname); // Use original filename
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function(req, file, callback) {
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 100 // 100 MB
  }
});

module.exports = { upload };