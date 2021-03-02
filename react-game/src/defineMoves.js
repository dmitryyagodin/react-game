export default function defineMoves(numbers) {
  let nullIndex = numbers.indexOf(null);
  let moves;
  switch (nullIndex) {
    case 0:
      moves = [1, 3];
      break;
    case 1:
      moves = [0, 2, 4];
      break;
    case 2:
      moves = [1, 5];
      break;
    case 3:
      moves = [0, 4, 6];
      break;
    case 4:
      moves = [1, 3, 5, 7];
      break;
    case 5:
      moves = [2, 4, 8];
      break;
    case 6:
      moves = [3, 7];
      break;
    case 7:
      moves = [4, 6, 8];
      break;
    case 8:
      moves = [5, 7]
      break;
  }

  return moves
}