function slideWindow(arr,k){
    sort = arr.sort((a,b)=> a - b)
    var start = 0;
    var end = sort.length-1;

    for (var i=0; i<sort.length; i++){
        var sum = sort[start] + sort[end];
        if (sum < k){
            start++;
        }
        else if (sum > k){
            end--;
        }
        else{
            return true;
        }
    }
    return false
}

var arr = [10,15,3,7]
var k = 17

var output = slideWindow(arr,k) ? "true" : "false"
console.log(output)