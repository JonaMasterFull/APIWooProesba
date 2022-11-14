require('dotenv').config()

class Config {

    get paramsPriceAvailability(){
        return {
            'includeAvailability': false,
            'includePricing': true,
            'includeProductAttributes' : false
        }
    }

    async configIngram(){

    }

    async clavesWoo(){
        let ajustes = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Y2tfMjU1NWI4NTk1NzZhMmZkMjM0ZDEwNDViMGEyYjIwYjE4ZmE1ODM5MDpjc19kYzdhYzZjZTgxNjFlNWI0NmFlYmZjY2M0ZmJhNWFiODM1OWZlYTBj'
            }
        }
        return ajustes;
    }
}

module.exports = Config