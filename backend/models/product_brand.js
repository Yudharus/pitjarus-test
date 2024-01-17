import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from './db.config.js';

export const ProductBrand = sequelize.define('product_brand', {
  brand_id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  brand_name: {
    type: DataTypes.STRING(20),
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'product_brand',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "brand_id" },
      ]
    },
  ]
});
