import { Sequelize } from "sequelize";
import { createUserModel, createRoleModel } from "../model/userSchema.js";
import { createProgress, createToDoListModel } from "../model/todoList.js";
import { createImages } from "../model/images.js";
import { createFulfillment, createItemOrder, createOrderModel, createOrderStatusModel, createPNGStatus, createTracking } from "../model/order.js";

const sequelize = new Sequelize('postgres', 'postgres', '1234', {
	host: 'localhost',
	dialect: 'postgres'
});

let UserModel = null;
let RoleModel = null;
let ProgressModel = null;
let TodoListModel = null;
let ImagesModel = null;
let OrderStatusModel = null;
let FulfillmentModel = null;
let ItemOrderModel = null;
let TrackingModel = null;
let PNGStatusModel = null;
let OrderModel = null;
const connection = async()=>{
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');

		RoleModel = await createRoleModel(sequelize)
		UserModel = await createUserModel(sequelize)
		ProgressModel = await createProgress(sequelize)
		TodoListModel = await createToDoListModel(sequelize)
		ImagesModel = await createImages(sequelize)
		OrderStatusModel = await createOrderStatusModel(sequelize)
		FulfillmentModel = await createFulfillment(sequelize)
		ItemOrderModel = await createItemOrder(sequelize)
		TrackingModel = await createTracking(sequelize)
		PNGStatusModel = await createPNGStatus(sequelize)
		OrderModel = await createOrderModel(sequelize)
		
		await sequelize.sync();
		console.log('database Synce');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

export {
	connection, UserModel, ProgressModel, TodoListModel, ImagesModel, OrderStatusModel, FulfillmentModel, ItemOrderModel, TrackingModel, PNGStatusModel, OrderModel

}