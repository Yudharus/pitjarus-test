import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from './db.config.js';

export const ReportProduct = sequelize.define('report_product', {
  report_id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  store_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  compliance: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tanggal: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'report_product',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "report_id" },
      ]
    },
  ]
});

// export default function (sequelize, DataTypes) {
//   return sequelize.define('report_product', {
//     report_id: {
//       autoIncrement: true,
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true
//     },
//     store_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     product_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     compliance: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     tanggal: {
//       type: DataTypes.DATEONLY,
//       allowNull: false
//     }
//   }, {
//     sequelize,
//     tableName: 'report_product',
//     timestamps: false,
//     indexes: [
//       {
//         name: "PRIMARY",
//         unique: true,
//         using: "BTREE",
//         fields: [
//           { name: "report_id" },
//         ]
//       },
//     ]
//   });
// };
