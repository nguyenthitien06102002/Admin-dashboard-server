import { DataTypes } from "sequelize";

export const createOrderStatusModel = async (sequelize) => {
	const OrderStatus = sequelize.define('OrderStatus', {
		order_status_name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		order_status_active: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: '0'
		}
	});
	return OrderStatus;
};

export const createFulfillment = async (sequelize) => {
	const Fulfillment = sequelize.define('Fulfillment', {
		fulfillment_name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		fulfillment_active: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: '0'
		}
	});
	return Fulfillment;
};

export const createItemOrder = async (sequelize) => {
	const ItemOrder = sequelize.define('ItemOrder', {
		item_name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		item_active: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: '0'
		}
	});
	return ItemOrder;
};

export const createTracking = async (sequelize) => {
	const Tracking = sequelize.define('Tracking', {
		tracking_name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		tracking_active: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: '0'
		}
	});
	return Tracking;
};

export const createPNGStatus = async (sequelize) => {
	const PNGStatus = sequelize.define('PNGStatus', {
		png_status_name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		png_status_active: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: '0'
		}
	});
	return PNGStatus;
};

export const createOrderModel = async (sequelize) => {
	const Orders = sequelize.define('Order', {
		createBy: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Users',
				key: 'id'
			}
		},
		order_status: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'OrderStatuses',
				key: 'id'
			}
		},
		fulfillment: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Fulfillments',
				key: 'id'
			}
		},
		design_note: {
			type: DataTypes.STRING,
			allowNull: false
		},
		order_note: {
			type: DataTypes.STRING,
			allowNull: false
		},
		item_name: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'ItemOrders',
				key: 'id'
			}
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: '0'
		},
		revenue: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		base_cost: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		fee: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		tracking_status: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Trackings',
				key: 'id'
			}
		},
		png_status: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'PNGStatuses',
				key: 'id'
			}
		},
		sku: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		order_active: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		}
		//order_active = 2 : đã xóa


	});
	return Orders;
};


