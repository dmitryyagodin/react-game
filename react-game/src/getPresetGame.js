function getPresetGame(level) {
  const sets = [
    [ [null, 2, 3, 1, 5, 6, 4, 7, 8], [1, 4, 7, 8] ],
    [ [2, 3, 6, 1, 4, 8, 7, 5, null], [8, 6, 3, 2, 1, 4, 5, 8] ]
  ];

  
  return sets[level]
}
  
export default getPresetGame;