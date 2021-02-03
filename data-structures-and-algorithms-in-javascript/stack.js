// stacks
// a collection of items that obeys the principal LAST IN LAST OUT
// used for nested function calls in JavaScript - the callstack

// this is a factory function
function createStack() {
  // this is an array held in closure to store our items
  const array = [];

  return {
    // push
    push(item) {
      array.push(item);
    },
    // pop
    // remove the final item of the array
    pop() {
      return array.pop();
    },
    // peek
    peek() {
      return array[array.length - 1];
    },

    // length
    get length() {
      // using a getter ensures that we always get the current array's length
      return array.length;
    },
    // isEmpty
    isEmpty() {
      return array.length === 0;
    }
  }
}

const lowerBodyStack = createStack();

lowerBodyStack.push('underwear');
lowerBodyStack.push('socks');
lowerBodyStack.push('pants');
lowerBodyStack.push('shoes');

lowerBodyStack.pop();
lowerBodyStack.pop();

console.log(lowerBodyStack.peek());
console.log(lowerBodyStack.length);
