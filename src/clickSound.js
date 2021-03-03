import  click from './click.mp3';
import error from './error.mp3';

function clickSound(type) {
  const validClick = new Audio(click);
  const errorSound = new Audio(error);
  return type === 'valid' ? validClick.play() : errorSound.play();
}  

export default clickSound;