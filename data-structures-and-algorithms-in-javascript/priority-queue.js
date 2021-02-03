const { createQueue } = require('./queue-data-structure.js');

function createPriorityQueue() {
  const lowPriorityQueue = createQueue();
  const highPriorityQueue = createQueue();

  return {
    // enqueue
    enqueue(item, isHighPriority = false) {
      isHighPriority ? highPriorityQueue.enqueue(item) : lowPriorityQueue.enqueue(item);
    },
    // dequeue
    dequeue() {
      // this ensures that all high priority items are dequeued first
      if (!highPriorityQueue.isEmpty()) {
        return highPriorityQueue.dequeue();
      }

      return lowPriorityQueue.dequeue();
    },
    // peek

    peek() {
      // this ensures that all high priority items are peeked first
      if (!highPriorityQueue.isEmpty()) {
        return highPriorityQueue.peek();
      }

      return lowPriorityQueue.peek();
    },
    // length
    length() {
      return highPriorityQueue.length + lowPriorityQueue.length;
    },
    // isEmpty
    isEmpty() {
      // the conjunction of the two isEmpty methods
      return highPriorityQueue.isEmpty() && lowPriorityQueue.isEmpty()
    }
  }
}

const q = createPriorityQueue();

q.enqueue('A fix here');
q.enqueue('A bug there');
q.enqueue('A new feature');

q.dequeue();
q.enqueue('emergency task!', true);
console.log(q.dequeue());
console.log(q.peek());
