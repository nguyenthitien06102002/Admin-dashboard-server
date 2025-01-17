import { where } from "sequelize"
import { UserModel } from "../postgres/postgres.js"
import jwt from 'jsonwebtoken';

export const getAllEmp=async(req,res)=>{
	try{
		const users= await UserModel.findAll()
		if(users.length==0){
			return res.status(200).json({"error":"user not found"})
		}
		return res.status(200).json(users)

	}catch(error){
		console.log(error)
		return res.status(200).json({ "error": "Internal server error" })
	}
}


export const addEmp=async(req, res) => {
	const {name, email, password, role_id, status_user} = req.body;
	try{
		const emp = await UserModel.findOne({where: {email: email}})
		if(emp==null){
			await UserModel.create(req.body);
			return res.status(201).json({message: "User created successfully"})

		}
		return res.status(200).json({ message: "already found" })
	}catch(e){
		console.log(e)
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

		
		// const isMatch = await bcrypt.compare(password, user.password);
		const isMatch = password === user.password;
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		// Tạo JWT token
		const payload = {
			userId: user.id,
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