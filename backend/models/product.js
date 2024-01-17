import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from './db.config.js';


export const Product = sequelize.define('product', {
  product_id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  product_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  brand_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'product',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "product_id" },
      ]
    },
  ]
});
