import { Sequelize } from "sequelize";
import { createUserModel, createRoleModel } from "../model/userSchema.js";
import { createProgress, createToDoListModel } from "../model/todoList.js";

const sequelize = new Sequelize('postgres', 'postgres', '1234', {
	host: 'localhost',
	dialect: 'postgres'
});

let UserModel = null;
let RoleModel = null;
let ProgressModel = null;
let TodoListModel = null;
const connection = async()=>{
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');

		RoleModel = await createRoleModel(sequelize)
		UserModel = await createUserModel(sequelize)
		ProgressModel = await createProgress(sequelize)
		TodoListModel = await createToDoListModel(sequelize)
		
		await sequelize.sync();
		console.log('database Synce');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

export {
	connection, UserModel, ProgressModel, TodoListModel

}