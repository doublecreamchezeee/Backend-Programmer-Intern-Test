function rle(str){
    // Convert the string to an array of characters
    var chars = str.split("");
    var unique = []
    var uniqueCount = []
    var count = 0
    for (var i=0 ; i<chars.length; i++){
        if (chars[i] === chars[i+1]){
            count++;
            continue;
        }
        unique.push(chars[i])
        uniqueCount.push(count+1)
        count = 0
    }

    var output = "";
    for (var i=0; i<unique.length; i++){
        if (uniqueCount[i] === 1){
            output += unique[i];
        }
        else {
            output += uniqueCount[i] + unique[i];
        }
    }
    return output;
}


var input1 = "AABBBCCCCCAADDDD";
var input2 = "PPPQRRRSTTQQS";
var input3 = "XYZ";

console.log(rle(input1));
console.log(rle(input2));
console.log(rle(input3));