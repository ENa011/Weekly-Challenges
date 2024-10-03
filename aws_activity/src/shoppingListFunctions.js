const {
    createItem,
    printAll,
    queryGrocery,
    queryGroceryBoolean,
    scanEmployeesByPurchased
} = require("./shoppingListDAO");
const uuid = require("uuid");
const {logger} = require("./util/logger");

// initially load the shopping list from the file

let shoppingList = scanEmployeesByPurchased(false);

async function addItem(itemID, name, price){
    let status = false;
    const newItem = {
        name,
        price: parseFloat(price).toFixed(2),
        purchased: status
    };
    let data = await createItem({itemID, name, price, status});
    logger.info(`Added Item: ${newItem.name}`);
    return `${name} has been added to the shopping list`;
}



module.exports = {
    addItem,
    shoppingList
}