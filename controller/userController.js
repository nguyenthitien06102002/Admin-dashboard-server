import { where } from "sequelize"
import { RoleModel, UserModel } from "../postgres/postgres.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Op } from "sequelize";

export const getAllEmp=async(req,res)=>{
	try{
		const users= await UserModel.findAll({
			where: {
				status_user: { [Op.ne]: '2' } 
			},
			include: [
				{
					model: RoleModel,
					as: 'roleDetail'
				}
			]
		})
		if(users.length==0){
			return res.status(200).json({"error":"user not found"})
		}
		return res.status(200).json(users)

	}catch(error){
		console.log(error)
		return res.status(200).json({ "error": "Internal server error" })
	}
}


export const addEmp = async (req, res) => {
	const { name, email, password, role_id, status_user } = req.body;

	try {
		if (role_id === 1) {
			return res.status(403).json({ error: "Không thể tạo tài khoản với quyền này!" });
		}


		const emp = await UserModel.findOne({ where: { email: email } });

		if (emp) {
			return res.status(409).json({ error: "Email đã tồn tại!" });
		}

		// Mã hóa mật khẩu và tạo user mới
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = {
			name,
			email,
			password: hashedPassword,
			role_id,
			status_user,
		};

		await UserModel.create(newUser);

		return res.status(201).json({ message: "Tạo tài khoản thành công!" });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ error: "Lỗi máy chủ nội bộ!" });
	}
};

export const getRoles = async (req, res) => {
	try {
		const roles = await RoleModel.findAll({
			where: {
				role_id: { [Op.ne]: 1 }
			}
		})
		if (roles.length == 0) {
			return res.status(200).json({ "error": "role not found" })
		}
		return res.status(200).json(roles)

	} catch (error) {
		console.log(error)
		return res.status(200).json({ "error": "Internal server error" })
	}
}


export const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await UserModel.findOne({ where: { email: email } });

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		
		const isMatch = await bcrypt.compare(password, user.password);
		// const isMatch = password === user.password;
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		// Tạo JWT token
		const payload = {
			userId: user.id,
			userName: user.name,
			role: user.role_id,
			email: user.email,

		};

		const token = jwt.sign(payload, 'yourSecretKey', { expiresIn: '1h' });

		
		return res.status(200).json({ message: "Login successful", token });

	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};