import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from './db.config.js';


export const StoreArea = sequelize.define('store_area', {
  area_id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  area_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'store_area',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "area_id" },
      ]
    },
  ]
});