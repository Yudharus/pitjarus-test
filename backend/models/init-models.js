// init-models.js
import { DataTypes } from 'sequelize';
import product from './product.js';
import product_brand from './product_brand.js';
import report_product from './report_product.js';
import store from './store.js';
import store_account from './store_account.js';
import store_area from './store_area.js';

function InitModels(sequelize) {
  const Product = product(sequelize, DataTypes);
  const ProductBrand = product_brand(sequelize, DataTypes);
  const ReportProduct = report_product(sequelize, DataTypes);
  const Store = store(sequelize, DataTypes);
  const StoreAccount = store_account(sequelize, DataTypes);
  const StoreArea = store_area(sequelize, DataTypes);

  return {
    Product,
    ProductBrand,
    ReportProduct,
    Store,
    StoreAccount,
    StoreArea,
  };
}

export default InitModels;
