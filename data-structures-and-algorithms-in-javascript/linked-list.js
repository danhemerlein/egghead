// Linked list
// a collection of items where each item has a connection to the next one

// factory function
function createNode(value) {
  return {
    value,
    next: null
    // could also implement a doubly linked list where each node has a previous prop
  }
}

function createLinkedList() {
  return {
    // head
    head: null,
    // tail
    tail: null, // a cyclical list, the tail points to the head
    // length
    length: 0,

    // push
    push(value) {
      const node = createNode(value)

      // if the list does not have a head or tail
      if (this.head === null) {
        this.head = node;
        this.tail = node;
        this.length++;
        return node;
      }

      // new node gets set to the current tail's next property
      this.tail.next = node;
      this.tail = node;
      this.length++;

      return node;
    },

    // pop
    pop() {
      // how do we pop items if the list is empty, has an length of one, and has many

      if (this.isEmpty()) {
        return null;
      }

      // always return the tail node if the list has a length
      const node = this.tail;

      // if the list has a length of one (the head and the tail are the same)
      if (this.head === this.tail) {
        this.head = null;
        this.tail = null;
        this.length--;
        return node;
      }

      let current = this.head;
      let penultimate;

      while (current) {
        // this will define the penultimate variable
        if (current.next === this.tail) {
          penultimate = current;
          break;
        }

        // to move on
        current = current.next;
      }

      penultimate.next = null;
      this.tail = penultimate;
      this.length--;

      return node;

    },

    // get
    get(index) {
      if (index < 0 || index > this.length - 1) {
        return null;
      }

      if (index === 0) {
        return this.head;
      }

      let current = this.head;
      let i = 0;

      while (i < index) {
        i++;
        current = current.next;
      }

      return current;

    },

    // delete - this will be pretty similar to the get method
    delete(index) {
      if (index < 0 || index > this.length - 1) {
        return null;
      }

      if (index === 0) {
        const deleted = this.head;
        this.head = this.head.next;
        this.length--;
        return deleted;
      }

      let current = this.head;

      // a deleteion in a linked list -
      let previous;
      let i = 0;
      while (i < index) {
        i++;
        previous = current;
        current = current.next;
      }

      const deleted = current;
      // do the work of setting the previous' next prop to the current next prop - this slices out the current node
      previous.next = current.next;


      // if its the tail of the list
      if (previous.next === null) {
        this.tail = previous;
      }

      this.length--;
      return deleted;

    },
    // isEmpty
    isEmpty() {
      return this.length === 0;
    },

    print() {
      const values = [];
      let current = this.head;

      while (current) {
        values.push(current.value);
        current = current.next;
      }

      return values.join(' => ');
    }
  }
}

const list = createLinkedList();
const values = ['a', 'b', 'c', 'd', 'e'];
const nodes = values.map(val => list.push(val));

console.log(list.isEmpty());

// should return 'e'
console.log(list.pop().value);

// returns 'b'
console.log(list.get(1));

// deletes 'b'
console.log(list.delete(1));

// confirm 'b' is deleted
console.log(list.print());
