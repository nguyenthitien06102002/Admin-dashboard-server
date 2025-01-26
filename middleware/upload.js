import multer from 'multer';
import path from 'path';

// Cấu hình nơi lưu file và tên file
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/'); 
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

// Bộ lọc file để chỉ nhận file hình ảnh
const fileFilter = (req, file, cb) => {
	const ext = path.extname(file.originalname).toLowerCase();
	if (['.png', '.jpg', '.jpeg', '.gif'].includes(ext)) {
		cb(null, true);
	} else {
		cb(new Error('Chỉ hỗ trợ file ảnh (PNG, JPG, JPEG, GIF)!'), false);
	}
};

// Tạo middleware Multer
const upload = multer({
	storage,
	fileFilter,
});

export default upload;
