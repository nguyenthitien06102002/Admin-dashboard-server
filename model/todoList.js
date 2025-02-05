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
	// Progress.associate = (models) => {
	// 	Progress.hasMany(models.TodoList, { foreignKey: 'type', as: 'progress' });
	// };
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
			references: {
				model: 'Progress',
				key: 'id'
			}
		},
		status_todo: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: '0'
		}
		//status_todo = 1 : public, 2 : private, 3: detele

		
	});
	TodoList.associate = (models) => {
		// Quan hệ với Users cho trường createBy (người tạo)
		TodoList.belongsTo(models.User, { foreignKey: 'createBy', as: 'creator' });

		// Quan hệ với Users cho trường asignedTo (người được giao)
		TodoList.belongsTo(models.User, { foreignKey: 'asignedTo', as: 'assignee' });

		// TodoList.belongsTo(models.Progress, { foreignKey: 'type', as: 'progress' });
	
	};
	return TodoList;
};

