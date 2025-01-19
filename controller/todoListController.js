import { where } from "sequelize";
import { ProgressModel, TodoListModel } from "../postgres/postgres.js";


export const addProgress = async (req, res) => {
	const { name_progress, status_progress } = req.body;
	try {
		const name = await ProgressModel.findOne({ where: { name_progress: name_progress } })
		if (name == null) {
			await ProgressModel.create(req.body);
			return res.status(201).json({ message: "Progress created successfully" })

		}
		return res.status(200).json({ message: "already found" })
	} catch (e) {
		console.log(e)
		return res.status(200).json({ "error": "Internal server error" })
	}
}

export const getAllProgress = async (req, res) => {
	try {
		const progresses = await ProgressModel.findAll()

		if (progresses.length == 0) {
			return res.status(200).json({ "error": "progress not found" })
		}
		return res.status(200).json(progresses) 

	} catch (error) {
		console.log(error)
		return res.status(500).json({ "error": "Internal server error" }) 
	}
}



export const addTodoList = async (req, res) => {
	const { createBy, asignedTo, title_name, type, status_todo } = req.body;

	try {

		const todoData = {
			createBy,
			asignedTo,
			title_name,
			type,
			status_todo: status_todo || 1, 
		};

		await TodoListModel.create(todoData);

		return res.status(201).json({ message: "Todo created successfully" });
	} catch (e) {
		console.error(e);
		return res.status(500).json({ error: "Internal server error" });
	}
};




