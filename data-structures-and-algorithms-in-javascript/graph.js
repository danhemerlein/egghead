const { createQueue } = require('./queue-data-structure.js');

// graph
// a collection made up of nodes aka vertices
// nodes MAY point to other nodes, known as edges

function createNode(key) {
  const neighbors = [];
  return {
    key,
    neighbors,
    addNeighbor(node) {
      neighbors.push(node);
    }
  }
}

function createGraph(directed = false) {
  const nodes = [];
  const edges = [];

  return {
    directed,
    nodes,
    edges,

    addNode(key) {
      nodes.push(createNode(key))
    },

    getNode(key) {
      return nodes.find(node => node.key === key)
    },

    addEdge(node1key, node2key) {
      const node1 = this.getNode(node1key);
      const node2 = this.getNode(node2key);

      node1.addNeighbor(node2);
      edges.push(`${node1key}-${node2key}`);

      if (!directed) {
        node2.addNeighbor(node1);
      }
    },

    print() {
      return nodes.map(({key, neighbors}) => {
        let result = key;

        if (neighbors.length) {
          result += ` => ${neighbors.map(neighbor => neighbor.key).join(' ')}`
        }

        return result;
      })

      .join('\n');
    },

    // Breadth First Search
    // starts at one node and explores as widely as possible before going furth down adjacent node

    breadthFirst(startingNodeKey, visitFn) {
      const startingNode = this.getNode(startingNodeKey);

      const visited = nodes.reduce((acc, node) => {
        acc[node.key] = false;
        return acc;
      }, {})

      const q = createQueue();
      q.enqueue(startingNode);

      while (!q.isEmpty()) {
        const currentNode = q.dequeue();

        if (!visited[currentNode.key]) {
          visitFn(currentNode);
          visited[currentNode.key] = true;
        }

        currentNode.neighbors.forEach(node => {
          if (!visited[node.key]) {
            q.enqueue(node);
          }
        })

      }
    }
  }
}

const graph = createGraph(true);

graph.addNode('Noah');
graph.addNode('Jake');
graph.addNode('Beans');
graph.addNode('Crumbs');

graph.addEdge('Noah', 'Jake');
graph.addEdge('Jake', 'Noah');

graph.addEdge('Noah', 'Beans');
graph.addEdge('Noah', 'Crumbs');

graph.addEdge('Jake', 'Beans');
graph.addEdge('Jake', 'Crumbs');

graph.addEdge('Crumbs', 'Jake');
graph.addEdge('Beans', 'Noah');


console.log(graph.print());

const graph2 = createGraph(true);
const nodes = ['a', 'b','c','d','e','f'];
const edges = [
  ['a','b'],
  ['a','e'],
  ['a','f'],
  ['b','d'],
  ['b','e'],
  ['c','b'],
  ['d','c'],
  ['d','e'],
];

nodes.forEach(node => {
  graph2.addNode(node)
});

edges.forEach(nodes => {
  graph2.addEdge(...nodes)
});

graph2.breadthFirst('a', node => {
  console.log(node.key);
})
