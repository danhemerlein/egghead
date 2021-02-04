// Queues
// first in first out

const createQueue = function() {
  const queue = [];
  return {
    // add or enqueue
    enqueue(item) {
      // unshift adds to the beginning of an array
      queue.unshift(item);
    },

    // remove or dequeue
    dequeue(item) {
      // pop removes the last item of an array
      return queue.pop(item)
    },

    // peek
    peek() {
      return queue[queue.length - 1];
    },

    peekTwo() {
      return queue[queue.length - 2];
    },

    // length - need to use a getter function here
    get length() {
      return queue.length;
    },

    // isEmpty
    isEmpty() {
      return queue.length === 0;
    },

    show() {
      return queue;
    }
  }
}

const q = createQueue();
// console.log(q.isEmpty());

q.enqueue('make an egghead lesson');
q.enqueue('help others learn');
q.enqueue('be happy');

// ['be happy', 'help others learn', 'make an egghead lesson']

q.dequeue();

// ['be happy', 'help others learn']

// console.log(q.peek());
// console.log(q.isEmpty());

exports.createQueue = createQueue;
