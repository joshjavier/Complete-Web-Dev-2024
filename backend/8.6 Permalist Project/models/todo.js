import { DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'

export const Todo = sequelize.define('todo', {
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  underscored: true,
})
