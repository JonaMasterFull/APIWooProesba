const axios = require("axios");
const chunks = require("chunk-array").chunks;


class PricesIngram {
    url = 'https://proesba.shop/wp-json/wc/v3/products'

    async updatePricesWoo (skuIngram, array){

        const data = skuIngram.map((skus)=> {
            const id = array.find((item) => item.SKU == skus.sku).ID

            return {
                id: id,
                regular_price: skus.regular_price,
                stock_quantity :skus.quantity,
                status: skus.status,
                catalog_visibility: skus.catalog_visibility
            }
        });

        return data;
    }

    async UpdatePrices(data, configWoo){
        let i = 0;
        const products = chunks(data, 1);

        for (const value of products) {
            const id = value[0].id;
            const regular_price = value[0].regular_price;
            const stock_quantity = value[0].stock_quantity;
            const status = value[0].status;
            const catalog_visibility = value[0].catalog_visibility;


            const data = JSON.stringify(
                {
                    regular_price: `${regular_price}`,
                    stock_quantity,
                    status,
                    catalog_visibility
                },
            );


            await axios.put(
                `${this.url}/${id}`,
                data,
                configWoo
            );
            i++;
        }

        return `Actualizados ${i}`;
    }

    



}



module.exports = PricesIngram;