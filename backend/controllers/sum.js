import { DataTypes, Sequelize } from 'sequelize';
import { Product } from "../models/product.js"
import { ProductBrand } from '../models/product_brand.js';
import { ReportProduct } from "../models/report_product.js";
import { StoreArea } from '../models/store_area.js';
import { Store } from '../models/store.js';

export const chartSum = async (req, res) => {
    try {
        const results = await ReportProduct.findAll({
            attributes: [
                'store_id',
                [Sequelize.fn('SUM', Sequelize.col('compliance')), 'sumCompliance'],
                [Sequelize.fn('COUNT', Sequelize.col('*')), 'totalRows']
            ],
            group: ['store_id'],
        });

        // Ambil store_id dari hasil perhitungan
        const storeIds = results.map(result => result.store_id);

        // Ambil data dari model Store berdasarkan store_id
        const storeData = await Store.findAll({
            where: { store_id: storeIds },
        });

        // Ambil area_id dari model Store
        const areaIds = storeData.map(store => store.area_id);

        // Ambil data dari model StoreArea berdasarkan area_id
        const storeAreaData = await StoreArea.findAll({
            where: { area_id: areaIds },
        });

        // Gabungkan data dengan area_name yang sama
        const mergedData = [];
        results.forEach(result => {
            const storeInfo = storeData.find(store => store.store_id === result.store_id);
            const areaInfo = storeAreaData.find(area => area.area_id === storeInfo.area_id);

            const existingEntry = mergedData.find(entry => entry.area_name === areaInfo.area_name);

            if (existingEntry) {
                existingEntry.percentage_compliance += result.get('sumCompliance') / result.get('totalRows') * 100;
            } else {
                mergedData.push({
                    store_id: result.store_id,
                    area_name: areaInfo.area_name,
                    percentage_compliance: result.get('sumCompliance') / result.get('totalRows') * 100
                });
            }
        });

        mergedData.forEach(entry => {
            entry.percentage_compliance = Math.min(entry.percentage_compliance, 100);
        });

        res.status(200).json({
            status: 200,
            msg: "Sukses mengambil data! ",
            mergedData
        });
    } catch (error) {
        res.status(501).json({
            msg: "Gagal mengambil data!",
            error: true,
        })
    }
}

export const tabelSum = async (req, res) => {
    try {
        const results = await ReportProduct.findAll({
            attributes: [
                'product_id',
                'store_id',
                [Sequelize.fn('SUM', Sequelize.col('compliance')), 'sumCompliance'],
                [Sequelize.fn('COUNT', Sequelize.col('*')), 'totalRows']
            ],
            group: ['product_id', 'store_id'],
        });

        const storeIds = results.map(result => result.store_id);

        const storeData = await Store.findAll({
            where: { store_id: storeIds },
        });

        const areaIds = storeData.map(store => store.area_id);

        const storeAreaData = await StoreArea.findAll({
            where: { area_id: areaIds },
        });

        const productIds = results.map(result => result.product_id);

        const productData = await Product.findAll({
            where: { product_id: productIds },
        });

        const brandIds = productData.map(product => product.brand_id);

        const productBrandData = await ProductBrand.findAll({
            where: { brand_id: brandIds },
        });

        const mergedData = [];
        results.forEach(result => {
            const storeInfo = storeData.find(store => store.store_id === result.store_id);
            const areaInfo = storeAreaData.find(area => area.area_id === storeInfo.area_id);
            const productInfo = productData.find(product => product.product_id === result.product_id);
            const brandInfo = productBrandData.find(brand => brand.brand_id === productInfo.brand_id);

            const existingEntry = mergedData.find(entry => entry.brand_name === brandInfo.brand_name && entry.area_name === areaInfo.area_name);

            if (existingEntry) {
                existingEntry.percentage_compliance += result.get('sumCompliance') / result.get('totalRows') * 100;
            } else {
                mergedData.push({
                    brand_name: brandInfo ? brandInfo.brand_name : null,
                    percentage_compliance: result.get('sumCompliance') / result.get('totalRows') * 100,
                    area_name: areaInfo.area_name,
                });
            }
        });

        const groupedData = mergedData.reduce((accumulator, entry) => {
            const existingEntry = accumulator.find(item =>
                item.area_name === entry.area_name && item.brand_name === entry.brand_name
            );

            if (existingEntry) {
                existingEntry.percentage_compliance += entry.percentage_compliance;
            } else {
                accumulator.push({ ...entry });
            }

            return accumulator;
        }, []);

        res.status(200).json({
            status: 200,
            msg: "Sukses mengambil data! ",
            groupedData
        });
    } catch (error) {
        res.status(501).json({
            msg: "Gagal mengambil data!",
            error: true,
        })
    }
}

export const filterArea = async (req, res) => {
    try {
        const areaFilter = req.body.area_name

        const results = await ReportProduct.findAll({
            attributes: [
                'store_id',
                [Sequelize.fn('SUM', Sequelize.col('compliance')), 'sumCompliance'],
                [Sequelize.fn('COUNT', Sequelize.col('*')), 'totalRows']
            ],
            group: ['store_id'],
        });

        const storeIds = results.map(result => result.store_id);

        const storeData = await Store.findAll({
            where: { store_id: storeIds },
        });

        const areaIds = storeData.map(store => store.area_id);

        const storeAreaData = await StoreArea.findAll({
            where: { area_id: areaIds },
        });

        const mergedData = [];
        results.forEach(result => {
            const storeInfo = storeData.find(store => store.store_id === result.store_id);
            const areaInfo = storeAreaData.find(area => area.area_id === storeInfo.area_id);

            if (!areaFilter || (areaInfo && areaInfo.area_name.toLowerCase() === areaFilter.toLowerCase())) {
                const existingEntry = mergedData.find(entry => entry.area_name === areaInfo.area_name);

                if (existingEntry) {
                    existingEntry.percentage_compliance += result.get('sumCompliance') / result.get('totalRows') * 100;
                } else {
                    mergedData.push({
                        store_id: result.store_id,
                        area_name: areaInfo.area_name,
                        percentage_compliance: result.get('sumCompliance') / result.get('totalRows') * 100
                    });
                }
            }
        });

        mergedData.forEach(entry => {
            entry.percentage_compliance = Math.min(entry.percentage_compliance, 100);
        });

        res.status(200).json({
            status: 200,
            msg: "Sukses filter data! ",
            mergedData
        });
    } catch (error) {
        res.status(501).json({
            msg: "Gagal mengambil data!",
            error: true,
        });
    }
}

export const filterDate = async (req, res) => {
    try {
        const dateFrom = req.body.date_from;
        const dateTo = req.body.date_to;

        const results = await ReportProduct.findAll({
            attributes: [
                'store_id',
                'tanggal',
                [Sequelize.fn('SUM', Sequelize.col('compliance')), 'sumCompliance'],
                [Sequelize.fn('COUNT', Sequelize.col('*')), 'totalRows']
            ],
            group: ['store_id', 'tanggal'],
        });

        const mergedData = [];
        results.forEach(result => {
            if ((!dateFrom || !dateTo || (result.tanggal >= dateFrom && result.tanggal <= dateTo))) {
                const existingEntry = mergedData.find(entry => entry.area_name === result.area_name && entry.tanggal === result.tanggal);

                if (existingEntry) {
                    existingEntry.percentage_compliance += result.get('sumCompliance') / result.get('totalRows') * 100;
                } else {
                    mergedData.push({
                        store_id: result.store_id,
                        area_name: result.area_name,
                        tanggal: result.tanggal,
                        percentage_compliance: result.get('sumCompliance') / result.get('totalRows') * 100
                    });
                }
            }
        });

        mergedData.forEach(entry => {
            entry.percentage_compliance = Math.min(entry.percentage_compliance, 100);
        });

        res.status(200).json({
            status: 200,
            msg: "Sukses mengambil data! ",
            mergedData
        });

    } catch (error) {
        res.status(501).json({
            msg: "Gagal mengambil data!",
            error: true,
        });
    }
}