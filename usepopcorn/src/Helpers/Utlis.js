export function getAverage(array) {
  return array.reduce((total, currentValue) => total + currentValue / array.length, 0);
}
