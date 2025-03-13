const fs = require("fs");

const getData = () => JSON.parse(fs.readFileSync("./data.json", "utf8"));

module.exports = {
    products: ({ fields }) => {
        let products = getData();
        if (fields) {
            return products.map(product => {
                let filtered = {};
                fields.forEach(field => {
                    if (product[field] !== undefined) filtered[field] = product[field];
                });
                return filtered;
            });
        }
        return products;
    },
};
