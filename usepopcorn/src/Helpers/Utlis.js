export function average(array) {
  return array.reduce((total, currentValue) => total + currentValue / array.length, 0);
}
