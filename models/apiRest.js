const axios = require('axios');
require('dotenv').config()
const fs = require('fs');
const chunks = require("chunk-array").chunks;

class ApiWoo {
    url = 'http://mx.bdicentralserver.com/api/categorias_per_client/44';
    url2 = 'https://proesba.shop/wp-json/wc/v3/products/categories';
    url3 = 'http://mx.bdicentralserver.com/api/productos_per_client/44';
    url4 = 'https://proesba.shop/wp-json/wc/v3/products';

    guardarurl = './data/skuWoo1.json';
    guardarurl2 = './data/Costos.json';

    async apiCategorias (){
        const resp = await axios.get(this.url);

        const info = resp.data.map((data) => {

            return {
                id: data.id,
                name: data.nombre,
                parent: data.parent_id
            }
        });

        return info;
    }

    async listCategory(config){
        const resp = await axios.get(this.url2, config);

        
        const idsParent = resp.data.map((data) => {
            return { id: data.id, name: data.name,parent: data.parent}
        });

        return idsParent;
        
    }

    async listProducts(){
        const resp = await axios.get(this.url3);

        const nuevoProduct = resp.data.map((item) => {
            return {
                name: item.nombre,
                sku: item.sku,
                height: item.height,
                width: item.width,
                length: item.length,
                id_categoria: item.id_categoria,
                categoria: item.categoria
            }            
        });

        return nuevoProduct;
    }

    async listPricesIngram(configIngram, sku){
        const url5 = 'https://api.ingrammicro.com:443/resellers/v6/catalog/priceandavailability'
        const products = chunks(sku,50);
        let arrOfPrices = []
        for(const datos of products){
            
            const data = {
                "products": datos
            }

            const resp = await axios.post(url5, data, configIngram); 

             resp.data.forEach((json) => {
                
                const regular_price = (json.hasOwnProperty('pricing') && json.pricing.hasOwnProperty('customerPrice')) ? json.pricing.customerPrice * 1.08: 0
                const status = (json.hasOwnProperty('pricing') && json.pricing.hasOwnProperty('customerPrice')) ? "publish" : "private"
                const catalog_visibility = status === "publish" ? "visible" : "hidden"
                const sku = json.ingramPartNumber;
                const quantity = (json.hasOwnProperty('availability') && json.availability.hasOwnProperty('totalAvailability')) ? json.availability.totalAvailability : 0

                

                arrOfPrices.push({ regular_price, sku, quantity, status, catalog_visibility})
                
            });
        }
        return arrOfPrices;
        
    }
    
}

module.exports = ApiWoo;