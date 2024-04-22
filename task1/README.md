# Task 1- T1.1 - Arrange string
Task T1.1 is an implementation of the Quick Sort algorithm.
Return the arrange string in acessding order.

## Usage
```javascript
var inputString = "webmaster";
var outputString = arrangeAlphabetically(inputString);
console.log(outputString); // Output: abeemrstw
```

## Implementation Details
The QuickSort algorithm implemented in this codebase consists of the following components:

- `partition`: This function takes an array, a low index, and a high index as parameters and partitions the array around a pivot element. It returns the index of the pivot element after partitioning.
- `quickSort`: This function recursively sorts the array using the QuickSort algorithm. It partitions the array and calls itself recursively on the subarrays before and after the pivot.

# Task 1 - T1.2 - Run-Length Encoding (RLE)
Task T1.2 is an implementation of the Run-Length Encoding (RLE) algorithm. The rle function takes a string as input and returns its run-length encoded representation.


## Usage

To use this function, simply call the rle function and pass the string you want to encode as an argument.


```javascript
var input1 = "AABBBCCCCCAADDDD";
var input2 = "PPPQRRRSTTQQS";
var input3 = "XYZ";

console.log(rle(input1)); // Output: 2A4B5C2A4D
console.log(rle(input2)); // Output: 3P1Q3R2S2T2Q1S
console.log(rle(input3)); // Output: XYZ
```


## Implementation Details
`rle(str)`

This function takes a string str as input and returns its run-length encoded representation.

- It converts the input string into an array of characters using split("").
- It iterates through the array, counting the consecutive occurrences of each character and storing the counts in an array uniqueCount, while maintaining a separate array unique to store unique characters encountered.
- It constructs the encoded string by iterating over the unique array and appending the corresponding count and character to the output string output.
## Example
Suppose we have the input string "AABBBCCCCCAADDDD". The function will encode it using the following steps:

- Convert to array: ['A', 'A', 'B', 'B', 'B', 'C', 'C', 'C', 'C', 'C', 'A', 'A', 'D', 'D', 'D', 'D']
- Count consecutive occurrences: ['A', 'B', 'C', 'A', 'D'], [2, 4, 5, 2, 4]
- Construct encoded string: 2A4B5C2A4D


# Task 1 - T1.3 - Check sum in array
Task T1.3 is an implementation of the problem which check whether any two numbers from
the list add up to the given k.


## Usage

To use this function, simply call the `slideWindow` function and pass the array and the target sum as arguments.


```javascript
var arr = [10, 15, 3, 7];
var k = 17;

var output = slideWindow(arr, k) ? "true" : "false";
console.log(output); // Output: true
```


## Implementation Details
`slideWindow(arr, k)`

This function takes an array arr and a target sum k as input and returns true if there are two elements in the array whose sum equals k, otherwise it returns false.

- It sorts the input array in ascending order.
- It initializes two pointers, start and end, pointing to the beginning and end of the sorted array, respectively.
- It iterates through the sorted array using a sliding window approach:
    - It calculates the sum of the elements pointed by the start and end pointers.
    - If the sum is less than k, it moves the start pointer to the right, as increasing the sum requires adding larger elements.
    - If the sum is greater than k, it moves the end pointer to the left, as decreasing the sum requires adding smaller elements.
    - If the sum equals k, it returns true.
- If the loop completes without finding a pair with sum equal to k, it returns false.
## Example
Suppose we have the input array [10, 15, 3, 7] and the target sum k = 17. The function will return true because 10 + 7 = 17.