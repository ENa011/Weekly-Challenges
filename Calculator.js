function calculator(number1, number2, str) {
    switch(str) {
        case('+'):
        return Number(number1 + number2);
        break;

        case('*'):
        return Number(number1 * number2);
        break;
        
        case('/'):
        return Number(number1/number2);
        break;

        case('-'):
        return Number(number1-number2);
        break;
    }

}
console.log (calculator(1,2, '+'));
console.log (calculator(3,4, '*'));
console.log (calculator(4,2, '/'));
console.log (calculator(1,2, '/'));
console.log (calculator(4,2, '-'));