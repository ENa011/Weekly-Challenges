const http = require('http');
const { shoppingList, addItem } = require('./shoppingListFunctions');
const {logger} = require('./util/logger');

const PORT = 3000;

const server = http.createServer((req, res) => {
    let body = "";

    req
        .on('data', (chunk) => {
            body += chunk;
        })
        .on("end", () => {
            body = body.length > 0 ? JSON.parse(body) : {};
            
            const contentType = {"Content-Type":"application/json"};

            if (req.url.startsWith("/items")){
                
                logger.info(req.url.split('/'));
                let index = parseInt(req.url.split("/")[2]);

                switch(req.method){
                    case "GET":
                        res.writeHead(200, contentType);
                        res.end(
                            JSON.stringify({
                                shoppingList
                            })
                        )
                        break;     
                    case "POST":
                        const {name, price} = body;
                        if (!name || !price){
                            res.writeHead(400, contentType);
                            res.end(
                                JSON.stringify({
                                    message: "Please provide valid name and price"
                                })
                            );
                        } else {
                            const message = addItem(index, name, price);
                            res.writeHead(201, contentType);
                            res.end(JSON.stringify({message, shoppingList}))
                        }
                        break;
                }
            }else{
                res.writeHead(404, contentType);
                res.end(JSON.stringify({message: "Invalid Endpoint"}))
            }

        })
});

server.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
})
    