const Woo = require('./models/config')

const main = async () => {

    const configWoo = new Woo();

    const config = await configWoo.clavesWoo();

    console.log(config);
}

main();