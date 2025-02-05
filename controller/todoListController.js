import { where } from "sequelize";
import { Op } from "sequelize";
import { ProgressModel, TodoListModel, UserModel } from "../postgres/postgres.js";


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

export const getAllTodolist = async (req, res) => {
	try {
		const userId = req.user.userId;
		const todoList = await TodoListModel.findAll({
			where: {
				status_todo: { [Op.ne]: 3 } // Lọc ra những đơn hàng có order_active khác 2
			},
			include: [
				{
					model: UserModel,  
					as: 'creator'  
				},
				{
					model: UserModel, 
					as: 'assignee'  
				},
				{
					model: ProgressModel,  
					as: 'progress'  
				}
			]
		});

		if (todoList.length == 0) {
			return res.status(200).json({ "error": "progress not found" })
		}
		const filteredTodoList = req.user.role === 1
			? todoList 
			: todoList.filter(
				(item) => item.status_todo === 1 || (item.status_todo === 2 && item.asignedTo === userId)
			);
		return res.status(200).json(filteredTodoList)

	} catch (error) {
		console.log(error)
		return res.status(500).json({ "error": "Internal server error" })
	}
}


export const updateTodoListActive = async (req, res) => {
	const { todoListId } = req.params;
	const { status_todo } = req.body;

	try {
		const todoList = await TodoListModel.findByPk(todoListId);
		if (!todoList) {
			return res.status(404).json({ error: "todoList not found" });
		}
		todoList.status_todo = status_todo;
		await todoList.save();

		return res.status(200).json({
			message: "status_todo updated successfully",
			todoList_id: todoList.id,
			status_todo: todoList.status_todo
		});

	} catch (e) {
		console.error(e);
		return res.status(500).json({ error: "Internal server error" });
	}
};


