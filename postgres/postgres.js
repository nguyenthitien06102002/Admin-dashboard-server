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

		UserModel.associate({ TodoList: TodoListModel });  // Liên kết User với TodoList
		TodoListModel.associate({ User: UserModel });
		// ProgressModel.associate({ TodoList: TodoListModel});

		ProgressModel.hasMany(TodoListModel, { foreignKey: 'type', as: 'progressTodos' });
		TodoListModel.belongsTo(ProgressModel, { foreignKey: 'type', as: 'progress' });

		UserModel.hasMany(OrderModel, { foreignKey: 'createBy', as: 'createByuser' });
		OrderModel.belongsTo(UserModel, { foreignKey : 'createBy', as: 'createByuser' });

		OrderStatusModel.hasMany(OrderModel, { foreignKey: 'order_status', as: 'OrderStatus' });
		OrderModel.belongsTo(OrderStatusModel, { foreignKey: 'order_status', as: 'OrderStatus' });

		FulfillmentModel.hasMany(OrderModel, { foreignKey: 'fulfillment', as: 'Fulfillments' });
		OrderModel.belongsTo(FulfillmentModel, { foreignKey: 'fulfillment', as: 'Fulfillments' });

		ItemOrderModel.hasMany(OrderModel, { foreignKey: 'item_name', as: 'itemName' });
		OrderModel.belongsTo(ItemOrderModel, { foreignKey: 'item_name', as: 'itemName' });

		TrackingModel.hasMany(OrderModel, { foreignKey: 'tracking_status', as: 'trackingStatus' });
		OrderModel.belongsTo(TrackingModel, { foreignKey: 'tracking_status', as: 'trackingStatus' });

		PNGStatusModel.hasMany(OrderModel, { foreignKey: 'png_status', as: 'pngStatus' });
		OrderModel.belongsTo(PNGStatusModel, { foreignKey: 'png_status', as: 'pngStatus' });

		OrderModel.hasMany(ImagesModel, { foreignKey: 'order_id', as: 'images' });
		ImagesModel.belongsTo(OrderModel, { foreignKey: 'order_id', as: 'images' });

		RoleModel.hasMany(UserModel, { foreignKey: 'role_id', as: 'roleDetail' });
		UserModel.belongsTo(RoleModel, { foreignKey: 'role_id', as: 'roleDetail' });
		
		await sequelize.sync();
		console.log('database Synce');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

export {
	connection, UserModel, ProgressModel, TodoListModel, ImagesModel, OrderStatusModel, FulfillmentModel, ItemOrderModel, TrackingModel, PNGStatusModel, OrderModel, RoleModel

}