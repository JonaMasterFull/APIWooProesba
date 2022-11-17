require('dotenv').config()


class Config {

    get paramWooCommerceCategoriesList(){
        return {
            'per_page': 45
        }
    }

    get paramsIngramPriceAvalibity(){
        return {
            
            includeAvailability: 'true',
            includePricing: 'true',
            includeProductAttributes : 'false'
        }
    }

    async clavesWooForProducts(){
        let ajustes = {
            auth: {
                username:`${process.env.CONSUMER_KEY}`,
                password: `${process.env.CONSUMER_SECRECT}`
            }
        }
        return ajustes;
    }
    

    async clavesWoo(){
        let ajustes = {
            headers: {
                'Content-Type': 'application/json',
            },
            auth: {
                username:`${process.env.CONSUMER_KEY}`,
                password: `${process.env.CONSUMER_SECRECT}`
            }
        }
        return ajustes;
    }

    async claveCategoria(){
        let ajustes = {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                ...this.paramWooCommerceCategoriesList
            },
            auth: {
                username:`${process.env.CONSUMER_KEY}`,
                password: `${process.env.CONSUMER_SECRECT}`
            }
        }
        return ajustes;
    }

    async claveProductos(){
        let ajustes = {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                ...this.paramWooCommerceCategoriesList
            },
            auth: {
                username:`${process.env.CONSUMER_KEY}`,
                password: `${process.env.CONSUMER_SECRECT}`
            }
        }
    }

    async configIngram(){
        let ajustes = {
            params: this.paramsIngramPriceAvalibity,
            headers: { 
                'IM-CustomerNumber': '50-000060', 
                'IM-CountryCode': 'MX', 
                'IM-CorrelationID': 'fbac82ba-cf0a-4bcf-fc03-0c5084', 
                Authorization: `Bearer ${ process.env.TOKEN}`,
                'Accept': 'application/json'
              }
            
        }

        return ajustes;
    }
    
    
   
}

module.exports = Config