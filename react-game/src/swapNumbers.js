export default function swapNumbers(nums, number) {  
  let numIndex = nums.indexOf(+number);
  let nullIndex = nums.indexOf(null);
  [nums[numIndex], nums[nullIndex]] = [nums[nullIndex], nums[numIndex]];
  
  return nums
}