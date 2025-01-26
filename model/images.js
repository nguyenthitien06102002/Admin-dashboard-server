import { DataTypes } from "sequelize";

export const createImages = async (sequelize) => {
	const Images = sequelize.define('Images', {
		name_image: {
			type : DataTypes.STRING,
			allowNull: false
		},
		order_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Orders',
				key: 'id'
			}
		},
		url_image: {
			type: DataTypes.STRING,
			allowNull: false
		}

	});
	return Images;
};