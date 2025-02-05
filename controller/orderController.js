import { where } from "sequelize";
import { Op } from "sequelize";
import { v4 as uuidv4 } from 'uuid';
import { FulfillmentModel, ImagesModel, ItemOrderModel, OrderModel, OrderStatusModel, PNGStatusModel, TrackingModel, UserModel } from "../postgres/postgres.js";

export const addOrderStatus = async (req, res) => {
	const { order_status_name, order_status_active } = req.body; 
	try {
		const existingOrderStatus = await OrderStatusModel.findOne({
			where: { order_status_name: order_status_name },
		});

		if (existingOrderStatus == null) {
			const newOrderStatus = {
				order_status_name: order_status_name,
				order_status_active: order_status_active || 1,
			};

			await OrderStatusModel.create(newOrderStatus);

			return res.status(201).json({ message: "Order status created successfully" });
		}
		return res.status(200).json({ message: "Order status already exists" });
	} catch (e) {
		console.error(e);
		return res.status(500).json({ error: "Internal server error" });
	}
};


export const getAllOrderStatus = async (req, res) => {
	try {
		const order_status = await OrderStatusModel.findAll()

		if (order_status.length == 0) {
			return res.status(200).json({ "error": "order_status not found" })
		}
		return res.status(200).json(order_status)

	} catch (error) {
		console.log(error)
		return res.status(500).json({ "error": "Internal server error" })
	}
}



export const addFulfillment = async (req, res) => {
	const { fulfillment_name, fulfillment_active } = req.body;
	try {
		const existingFulfillment = await FulfillmentModel.findOne({
			where: { fulfillment_name: fulfillment_name },
		});

		if (existingFulfillment == null) {
			const newFulfillment = {
				fulfillment_name: fulfillment_name,
				fulfillment_active: fulfillment_active || 1,
			};

			await FulfillmentModel.create(newFulfillment);

			return res.status(201).json({ message: "Fulfillment created successfully" });
		}
		return res.status(200).json({ message: "Order status already exists" });
	} catch (e) {
		console.error(e);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const getAllFulfillment = async (req, res) => {
	try {
		const fulfillment = await FulfillmentModel.findAll()

		if (fulfillment.length == 0) {
			return res.status(200).json({ "error": "fulfillment not found" })
		}
		return res.status(200).json(fulfillment)

	} catch (error) {
		console.log(error)
		return res.status(500).json({ "error": "Internal server error" })
	}
}


export const addItemOrder = async (req, res) => {
	const { item_name, item_active } = req.body;
	try {
		const existingItemOrder = await ItemOrderModel.findOne({
			where: { item_name: item_name },
		});

		if (existingItemOrder == null) {
			const newItemOrder = {
				item_name: item_name,
				item_active: item_active || 1,
			};

			await ItemOrderModel.create(newItemOrder);

			return res.status(201).json({ message: "Item created successfully" });
		}
		return res.status(200).json({ message: "Order status already exists" });
	} catch (e) {
		console.error(e);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const getAllItemOrder = async (req, res) => {
	try {
		const item_order = await ItemOrderModel.findAll()

		if (item_order.length == 0) {
			return res.status(200).json({ "error": "item_order not found" })
		}
		return res.status(200).json(item_order)

	} catch (error) {
		console.log(error)
		return res.status(500).json({ "error": "Internal server error" })
	}
}

export const addTracking = async (req, res) => {
	const { tracking_name, tracking_active } = req.body;
	try {
		const existingTracking = await TrackingModel.findOne({
			where: { tracking_name: tracking_name },
		});

		if (existingTracking == null) {
			const newTracking = {
				tracking_name: tracking_name,
				tracking_active: tracking_active || 1,
			};

			await TrackingModel.create(newTracking);

			return res.status(201).json({ message: "Tracking created successfully" });
		}
		return res.status(200).json({ message: "Tracking already exists" });
	} catch (e) {
		console.error(e);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const getAllTracking = async (req, res) => {
	try {
		const tracking = await TrackingModel.findAll()

		if (tracking.length == 0) {
			return res.status(200).json({ "error": "tracking not found" })
		}
		return res.status(200).json(tracking)

	} catch (error) {
		console.log(error)
		return res.status(500).json({ "error": "Internal server error" })
	}
}

export const addPNGStatus = async (req, res) => {
	const { png_status_name, png_status_active } = req.body;
	try {
		const existingPNGStatus = await PNGStatusModel.findOne({
			where: { png_status_name: png_status_name },
		});

		if (existingPNGStatus == null) {
			const newPNGStatus = {
				png_status_name: png_status_name,
				png_status_active: png_status_active || 1,
			};

			await PNGStatusModel.create(newPNGStatus);

			return res.status(201).json({ message: "png status created successfully" });
		}
		return res.status(200).json({ message: "png status already exists" });
	} catch (e) {
		console.error(e);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const getAllPNGStatus = async (req, res) => {
	try {
		const png_status = await PNGStatusModel.findAll()

		if (png_status.length == 0) {
			return res.status(200).json({ "error": "png_status not found" })
		}
		return res.status(200).json(png_status)

	} catch (error) {
		console.log(error)
		return res.status(500).json({ "error": "Internal server error" })
	}
}


export const addOrder = async (req, res) => {
	const { order_status, fulfillment, design_note, order_note, item_name, quantity, revenue, base_cost, fee, tracking_status, png_status,sku, order_active } = req.body;

	try {
		const createBy = req.user.userId;
		console.log(createBy);

		if (!createBy) {
			return res.status(403).json({ error: "Unauthorized: User ID not found" });
		}
		const randomSku = sku || uuidv4();
		const newOrder = {
			createBy: createBy,
			order_status: order_status,
			fulfillment: fulfillment,
			design_note: design_note,
			order_note: order_note,
			item_name: item_name,
			quantity: quantity,
			revenue: revenue,
			base_cost: base_cost,
			fee: fee,
			tracking_status: tracking_status,
			png_status: png_status,
			sku: sku || randomSku,
			order_active: order_active || 1,
		};

		// Tạo đơn hàng và lưu vào database
		const order = await OrderModel.create(newOrder);

		// Đảm bảo lấy đúng order_id từ đối tượng order được trả về
		if (order && order.id) {
			return res.status(201).json({
				message: "Order created successfully",
				order_id: order.id, // Trả về order_id
			});
		} else {
			return res.status(500).json({ error: "Failed to create order" });
		}

	} catch (e) {
		console.error(e);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const getAllOrder = async (req, res) => {
	try {
		const order = await OrderModel.findAll({
			where: {
				order_active: { [Op.ne]: 2 } // Lọc ra những đơn hàng có order_active khác 2
			},
			include: [
				{
					model: UserModel,
					as: 'createByuser'
				},
				{
					model: OrderStatusModel,
					as: 'OrderStatus'
				},
				{
					model: FulfillmentModel,
					as: 'Fulfillments'
				},
				{
					model: ItemOrderModel,
					as: 'itemName'
				},
				{
					model: TrackingModel,
					as: 'trackingStatus'
				},
				{
					model: PNGStatusModel,
					as: 'pngStatus'
				},
				{
					model: ImagesModel,
					as: 'images'
				},
			]
		});
		if (order.length == 0) {
			return res.status(200).json({ "error": "order not found" })
		}
		return res.status(200).json(order)

	} catch (error) {
		console.log(error)
		return res.status(500).json({ "error": "Internal server error" })
	}
}

export const updateOrderActive = async (req, res) => {
	const { orderId } = req.params; 
	const { order_active } = req.body; 

	try {
		const order = await OrderModel.findByPk(orderId);
		if (!order) {
			return res.status(404).json({ error: "Order not found" });
		}
		order.order_active = order_active;
		await order.save();

		return res.status(200).json({
			message: "Order status updated successfully",
			order_id: order.id,
			order_active: order.order_active
		});

	} catch (e) {
		console.error(e);
		return res.status(500).json({ error: "Internal server error" });
	}
};
