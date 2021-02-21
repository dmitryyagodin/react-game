const getInversionCount = function(arr) {
    let count = 0;
    let length = arr.length;
    let swapped;
    do {
        swapped = false;

        for (let i = 0; i < length; i++) {
            if (arr[i] > arr[i+1]) {
                [arr[i], arr[i+1]] = [arr[i+1], arr[i]];
                count++;
                swapped = true;
            }
        }
        length = length - 1;
    } while (swapped);

    return count // if the count is odd puzzle is unsolvable https://www.geeksforgeeks.org/check-instance-8-puzzle-solvable/
}

const sequence = [8, 1, 2, 4, 3, 7, 6, 5];

console.log(getInversionCount(sequence))