const Woo = require('./models/config')
const apiRest = require('./models/apiRest')
const agregarCategories = require('./models/agregarCategories');
const Config = require('./models/config');
const SkuWoo = require('./data/SkusWoo');
const SkuIngram = require('./data/SkuIngram');
const prices = require('./models/prices')

const main = async () => {

    const configWoo = new Woo();
    const apiRestBDI = new apiRest();
    const addAxiosCategory = new agregarCategories();
    const pricesBDI = new prices();

    const config = await configWoo.clavesWoo();
    const configCategories = await configWoo.claveCategoria();
    const configListProducts = await configWoo.clavesWooForProducts();
    const configIngramPrices = await configWoo.configIngram();

    //console.log(configCategories);

   // const categoriesBDI = await apiRestBDI.apiCategorias();

    //console.log(categories);

   // const listCategory = await apiRestBDI.listCategory(configCategories, categoriesBDI);
    //const updateParentId = await addAxiosCategory.UpdateCategoryParent(categoriesBDI,listCategory);

    //const listProducts = await apiRestBDI.listProducts();

    //const addProductsCategories = await addAxiosCategory.AddProducts(listProducts, listCategory);


    const searchPricesIngram = await apiRestBDI.listPricesIngram(configIngramPrices, SkuIngram);

    const verificarID = await  pricesBDI.updatePricesWoo(searchPricesIngram,SkuWoo );

    const UpdateProductsWoo = await pricesBDI.UpdatePrices(verificarID, config)

    console.log(UpdateProductsWoo);
    
    //const skuEquals = await pricesBDI.updatePricesWoo(SkuWoo)

    
    /**
     * @param
     * *AddProducts All
     */
    //const addProductAll = await addAxiosCategory.addProductsWoo(addProductsCategories, config);

    /**
     * *Update category Parent
     */
    //const updateCategoryID = await addAxiosCategory.UpdateCategory(updateParentId,config );

    /**
     * *Update category
     */
    //const AddCategory = await addAxiosCategory.AddCategoryNoParent(config, categories)
    
    //console.log(AddCategory);
    
}

main();