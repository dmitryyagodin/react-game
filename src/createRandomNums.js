function puzzleSolvable(nums) {
  let arr = [...nums];
  let count = 0;
  let swapped;

  do {
      swapped = false;

      for (let i = 0; i < arr.length; i++) {
          if (arr[i] > arr[i+1]) {
              [arr[i], arr[i+1]] = [arr[i+1], arr[i]];
              count++;
              swapped = true;
          }
      }

      arr.length -= 1;
  } while (swapped);

  return count % 2 === 0 // if the count is odd puzzle is unsolvable https://www.geeksforgeeks.org/check-instance-8-puzzle-solvable/
}

// put integers from 1 to 8 in a randomly ordered array  
function createRandomNums() {
let arr = [];

while (arr.length < 8) {
  let randomNumber = Math.floor(Math.random() * 8 + 1);
  if (!arr.includes(randomNumber)) {
    arr.push(randomNumber);
  }
}

return puzzleSolvable(arr) ? arr : createRandomNums();
}

export default createRandomNums;