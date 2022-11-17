const axios = require("axios");
const chunks = require("chunk-array").chunks;
const fs = require("fs");

class AddCategory {
    urlcategory = "https://proesba.shop/wp-json/wc/v3/products/categories/batch";
    urlUpdateCategory = "https://proesba.shop/wp-json/wc/v3/products/categories/batch";
    urladdProduct = "https://proesba.shop/wp-json/wc/v3/products/batch";

    guardarurl = './data/dataProducts.json';

    get paramsHeader() {
        return {
            "Content-Type": "application/json",
        };
    }

    async AddCategoryNoParent(config, data) {
        const products = chunks(data, 45);

        for (const value of products) {
            const dataWoo = JSON.stringify({
                create: value,
            });

            const resp = await axios.post(this.urlcategory, dataWoo, config);

            return resp.data;
        }
    }

    async UpdateCategoryParent(dataBdi, dataWoo) {
        let dataBDI = dataBdi.map((item) => {
            const id = dataWoo.find((cate) => item.name === cate.name).id;

            if (item.parent === "6") {
                return {
                    id: id,
                    name: item.name,
                    parent: 89,
                };
            } else if (item.parent === "9") {
                return {
                    id: id,
                    name: item.name,
                    parent: 93,
                };
            } else if (item.parent === "1") {
                return {
                    id: id,
                    name: item.name,
                    parent: 98,
                };
            } else if (item.parent === "10") {
                return {
                    id: id,
                    name: item.name,
                    parent: 102,
                };
            } else if (item.parent === "4") {
                return {
                    id: id,
                    name: item.name,
                    parent: 96,
                };
            } else if (item.parent === "2") {
                return {
                    id: id,
                    name: item.name,
                    parent: 104,
                };
            } else if (item.parent === "16") {
                return {
                    id: id,
                    name: item.name,
                    parent: 101,
                };
            } else if (item.parent === "14") {
                return {
                    id: id,
                    name: item.name,
                    parent: 114,
                };
            } else if (item.parent === "13") {
                return {
                    id: id,
                    name: item.name,
                    parent: 123,
                };
            } else if (item.parent === "0") {
                return {
                    id: id,
                    name: item.name,
                    parent: 0,
                };
            }
        });

        return dataBDI;
    }

    async UpdateCategory(data, configWoo) {
        let i = 0;
        const categories = chunks(data, 1);

        for (const value of categories) {
            const id = value[0].id;
            const parent = value[0].parent;

            const data = JSON.stringify({
                update: [
                    {
                        id: id,
                        parent: parent,
                    },
                ],
            });

            const resp = await axios.put(
                `${this.urlUpdateCategory}`,
                data,
                configWoo
            );


            i++;
        }

        return `Actualizados ${i}`;
    }

    async AddProducts(data, config) {

        const categorias = data.map((item) => {
            const id = config.find((cate) => item.categoria === cate.name).id;

            return {
                name: item.name,
                type: "simple",
                status: "publish",
                featured: false,
                catalog_visibility: "hidden",
                description: "",
                short_description: "",
                sku: item.sku,
                tax_status: "taxable",
                manage_stock: true,
                stock_quantity: 0,
                backorders: "no",
                low_stock_amount: 1,
                dimensions: {
                    length: item.length,
                    width: item.width,
                    height: item.height,
                },
                categories: [
                    {
                        id: id
                    }
                ],
                images: [],
                stock_status: "instock",
                has_options: false
            }
        });

        fs.writeFileSync(this.guardarurl, JSON.stringify(categorias))

        return categorias
    }

    async addProductsWoo(data, config) {
        let i = 0;
        const valores = chunks(data, 1);
        for (const product of valores) {

            const nombre = product[0].name;
            const sku = product[0].sku;
            const length = product[0].dimensions.length;
            const width = product[0].dimensions.width;
            const height = product[0].dimensions.height;
            const idCategory = product[0].categories[0].id



            const dataWoo = JSON.stringify({
                create: [
                    {
                        name: nombre,
                        type: "simple",
                        status: "publish",
                        featured: false,
                        catalog_visibility: "hidden",
                        description: "",
                        short_description: "",
                        sku: sku,
                        tax_status: "taxable",
                        manage_stock: true,
                        stock_quantity: 0,
                        backorders: "no",
                        low_stock_amount: 1,
                        dimensions: {
                            length: length,
                            width: width,
                            height: height,
                        },
                        categories: [
                            {
                                id: idCategory
                            }
                        ],
                        images: [],
                        stock_status: "instock",
                        has_options: false
                    },
                ],
            });


   
            await axios.post(this.urladdProduct, dataWoo, config);
            i++;
        }

        return `Agregados ${i}`;
    }


}

module.exports = AddCategory;
