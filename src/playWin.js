import winSound from './winSound.mp3';

function playWin() {
  const win = new Audio(winSound);
  return win.play()
}

export default playWin;