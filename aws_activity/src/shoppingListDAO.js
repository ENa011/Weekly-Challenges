const { DynamoDBClient, QueryCommand, ScanCommand} = require("@aws-sdk/client-dynamodb");
const {
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    UpdateCommand,
    DeleteCommand
} = require("@aws-sdk/lib-dynamodb")

const client = new DynamoDBClient({region: "us-east-2"});

const documentClient = DynamoDBDocumentClient.from(client);

const TableName = "GroceryList";

async function getItem(Key){
    const command = new GetCommand({
        TableName,
        Key
    });
    try{
        const data = await documentClient.send(command);
        return data.Item;
    }catch(err){
        console.error(err);
    }
}

async function printAll(){
    const command = new ScanCommand({
        TableName
        
    })
}

// Query is efficient when retrieving items based on the primary key (partition key) attributes and it can quickly retrieve a range of items
async function queryGrocery(id){
    const command = new QueryCommand({
        TableName,
        KeyConditionExpression: "#id = :id",
        ExpressionAttributeNames: { "#id": "ItemID"},
        ExpressionAttributeValues: { ":id": {S: id}}
    });

    try{
        const data = await documentClient.send(command);
        return data.Items[0];
    }catch(err){
        console.error(err);
    }
}


async function queryGroceryBoolean(purchased){
    // A GSI is created using role as the partition key and join_date as the sort key
    // The GSI does not need unique keys

    const params = {
        TableName,
        IndexName: "purchased-join_date-index",
        KeyConditionExpression: "#purchased = :purchased",
        ExpressionAttributeNames: {
            "#purchased": "purchased"
        },
        ExpressionAttributeValues: {
            ":purchased" : {BOOL: purchased}
        }
    };

    const command = new QueryCommand(params);

    try{
        const data = await documentClient.send(command);
        return data.Items;
    }catch(err){
        console.error(err);
    }
}

// Scan Operation
// The scan operation can return up to a maximum of 1 MB of data
// This does mean, for large scans you may have to do repeated scans of the table

async function scanEmployeesByPurchased(purchased){
    const command = new ScanCommand({
        TableName,
        FilterExpression: "#p = :p",
        ExpressionAttributeNames: {
            "#p": "purchased"
        },
        ExpressionAttributeValues: {
            ":p": {BOOL: purchased}
        }
    })

    try{
        const data = await documentClient.send(command);
        return data.Items;
    }catch(err){
        console.error(err);
    }
}

// CREATE
async function createItem(Item){
    const command = new PutCommand({
        TableName,
        Item
    });
    try{
        const data = await documentClient.send(command);
        return data;
    }catch(err){
        console.error(err);
    }
}

module.exports = {
    createItem,
    printAll,
    queryGrocery,
    queryGroceryBoolean,
    scanEmployeesByPurchased
}