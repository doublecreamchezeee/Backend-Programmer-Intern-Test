function swap(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

// Function to partition the array and return the index of the pivot element
function partition(arr, low, high) {
    var pivot = arr[high];
    var i = low - 1;

    // Iterate through the array from low to high
    for (var j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++; 
            swap(arr, i, j); 
        }
    }
    swap(arr, i + 1, high);
    return i + 1;
}

// Function to recursively sort the array using quicksort
function quickSort(arr, low, high) {
    if (low < high) {
        // pi is the partitioning index, arr[pi] is now at right place
        var pi = partition(arr, low, high);
        // Recursively sort elements before partition and after partition
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

// Function to arrange characters of a string alphabetically using quicksort
function arrangeAlphabetically(str) {
    var chars = str.split("");
    quickSort(chars, 0, chars.length - 1);
    var sortedStr = chars.join("");
    return sortedStr;
}

// Example usage
var inputString = "webmaster";
var outputString = arrangeAlphabetically(inputString);
console.log(outputString); // Output: abeemrstw
