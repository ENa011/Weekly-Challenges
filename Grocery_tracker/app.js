// Import the readline module for handling user input in the console
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin, // Read from standard input (keyboard)
  output: process.stdout // Write to standard output (console)
});

rl.on('line', (line) => {
    console.log(line);
});


rl.once('close', () => {
     // end of input
     console.log("Goodbye");
 });

const grocery = []; 
const initialQuestion = () => {
rl.question('what would you like to do?\nplease type add or remove or status or display\n', (answer) => {
  if(answer == 'add') {
      const newGrocery = {};
      rl.question('Enter name:', (name) => {
        newGrocery.name = name;  
      
        rl.question('Enter Quantity:', (quantity) => {
          newGrocery.quantity = quantity;
      
          rl.question('Enter price:', (price) => {
            newGrocery.price = price;           
            newGrocery.bought = false;
            grocery.push(newGrocery);
            console.log('item is added!');
            console.log(grocery);
            initialQuestion();
          });
        });
      });     
    } else if(answer == 'remove') {
      console.log(grocery);
      rl.question('Type a name to remove:', (name) => {
        grocery.splice(grocery.findIndex(x => x.name === name), 1)
        initialQuestion();
      });
    } else if(answer == 'display') {
      console.log(grocery);
      initialQuestion();
    } else if(answer == 'status') {
      rl.question('Type a name of grocery you bought\n:', (name) => {
        const index = grocery.findIndex(x=> x.name == name);
        grocery[index].bought = true;
        initialQuestion();
      });  
    } else {
      console.log('not the right option please type a right option :)');
      initialQuestion();
    };   
 })
}

initialQuestion();



