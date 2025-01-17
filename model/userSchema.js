import { DataTypes } from "sequelize";



export const createRoleModel = async (sequelize) => {
	const Role = sequelize.define('Role', {
		role_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		role_name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		status_role: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '0'
		}
	});
	return Role;
};


export const createUserModel = async (sequelize) => {
	const User = sequelize.define('User', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			isLowerCase: true,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		role_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Roles',
				key: 'role_id'
			}
		},
		status_user: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '0'
		}
	});
	return User;
};



