/*

Input = [73, 74, 75, 70, 72, 72, 71]
The input is an array of numbers representing the temperature over a set of days. Input[n] is the temperature on day n.
Return an output array where output[n] is the distance from n to the next index whose temperature is greater
I.e. the number of days until a warmer day
In this case the correct output would be [1, 1, 0, 1, 0, 0, 0]

*/

const input = [73, 74, 75, 70, 71, 70, 69, 70, 70, 72];
// answer   = [1,  1,  0,  6,  5,  4,  3,  2,  1,  0]

const { createQueue } = require('./queue-data-structure.js');
const { createStack } = require('./stack.js');

function compare(temp, nextTemp) {
  if (nextTemp > temp) {
    return true;
  } else {
    return false;
  }
}

function temps(arr) {
  const q = createQueue();
  const r = [];

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    q.enqueue(element);
  }

  let len = q.length;

  while (len) {
    let x = 0;
    let el = q.dequeue();

    // for (let i = 0; i < q.length; i++) {
    //   if (el, q.peek()) {

    //   }
    // }

    len--;
  }

  // console.log(q.show());

  return r;
}

console.log(temps(input));
