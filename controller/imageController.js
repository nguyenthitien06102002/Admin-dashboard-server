import { ImagesModel } from '../postgres/postgres.js';

export const uploadImage = async (req, res) => {
	const { order_id } = req.body; 

	if (!order_id) {
		return res.status(400).json({ message: 'Thiếu order_id!' });
	}
	try {
		// Kiểm tra xem file có tồn tại không
		if (!req.file) {
			return res.status(400).json({ message: 'Không tìm thấy file tải lên!' });
		}

		// Lấy thông tin file từ req.file
		const fileName = req.file.filename;
		const filePath = req.file.path;

		// Lưu thông tin file vào cơ sở dữ liệu
		const newImage = await ImagesModel.create({
			name_image: fileName,
			order_id: order_id,
			url_image: filePath,
		});

		// Trả về kết quả thành công
		res.json({
			message: 'Upload thành công!',
			data: newImage,
		});
	} catch (error) {
		console.error('Lỗi upload ảnh:', error);
		res.status(500).json({ message: 'Lỗi server khi upload ảnh!' });
	}
};