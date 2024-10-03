
const array = [1,2,3,4,5,6,7,8,9,10,11];

function chunkArray(array, size){
    const newArray = [];
    for (let i = 0; i < array.length; i += size) {
        const chunk = array.slice(i, i + size);
        console.log(chunk);
        newArray.push(chunk);
    }
    return newArray;
}  

console.log(chunkArray(array, 2));
