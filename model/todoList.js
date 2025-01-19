import { DataTypes } from "sequelize";

export const createProgress = async (sequelize) => {
	const Progress = sequelize.define('Progress', {
		name_progress: {
			type : DataTypes.STRING,
			allowNull: false
		},
		status_progress: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: '0'
		}

	});
	return Progress;
};

export const createToDoListModel = async (sequelize) => {
	const TodoList = sequelize.define('TodoList', {
		createBy: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Users',
				key: 'id'
			}
		},
		asignedTo: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Users',
				key: 'id'
			}
		},
		title_name: {
			type: DataTypes.STRING,
			allowNull: false
		},

		type: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: '0'
		},
		status_todo: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: '0'
		}
		
	});
	return TodoList;
};