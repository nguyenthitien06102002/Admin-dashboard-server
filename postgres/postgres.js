import { Sequelize } from "sequelize";
import { createUserModel, createRoleModel } from "../model/userSchema.js";

const sequelize = new Sequelize('postgres', 'postgres', '1234', {
	host: 'localhost',
	dialect: 'postgres'
});

let UserModel = null;
let RoleModel = null;
const connection = async()=>{
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');

		RoleModel = await createRoleModel(sequelize)
		UserModel = await createUserModel(sequelize)
		
		await sequelize.sync();
		console.log('database Synce');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

export { connection, UserModel 

}