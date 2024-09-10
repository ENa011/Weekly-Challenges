

function isPalindrome (string) {

    
    const removeSpace = string.split(" ").join("");
    const uniformLetter = removeSpace.toUpperCase(); 

    console.log(uniformLetter);
    console.log(uniformLetter[0]);
    for(let i = 0; i < uniformLetter.length; i++){
            if(uniformLetter[i] == uniformLetter[uniformLetter.length-1-i]) {
                return true;
            } else return false;
             
    }
}

console.log(isPalindrome("A man a plan a canal Panama"));


