function swap(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}
function arrangeAlphabetically(str) {
    // Convert the string to an array of characters
    var chars = str.split("");
    
    // Selection sort algorithm
    for (var i = 0; i < chars.length - 1; i++) {
        var minIndex = i;
        for (var j = i + 1; j < chars.length; j++) {
            if (chars[j] < chars[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            swap(chars, i, minIndex);
        }
    }
    
    // Join the sorted array back into a string
    var sortedStr = chars.join("");
    
    return sortedStr;
}

var inputString = "webmaster";
var outputString = arrangeAlphabetically(inputString);
console.log(outputString); 
// Output: abeemrstw