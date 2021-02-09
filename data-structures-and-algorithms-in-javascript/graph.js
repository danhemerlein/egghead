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
    },

    // Depth first search
    // Graph search algorithim that explores as far down as it can, before climbing back up and going down another path
    // starting node key is which node in the graph to start the search from and a visiting node function to be called as we visit each node for the first time
    depthFirstSearch(startingNodeKey, visitFn) {
      const startingNode = this.getNode(startingNodeKey);

      const visited = nodes.reduce ((acc, node) => {
        acc[node.key] = false
        return acc
      }, {})

      // recursion - if there's another road to go down we need to explore that one until we reach a dead end

      function explore(node) {
        if (visited[node.key]) {
          return;
        }

        visitFn(node);
        visited[node.key] = true;

        node.neighbors.forEach(node => explore(node));
      }

      explore(startingNode);

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

const graph2 = createGraph(true);

nodes.forEach(node => {
  graph2.addNode(node)
});

edges.forEach(nodes => {
  graph2.addEdge(...nodes)
});

graph2.breadthFirst('a', node => {
  console.log(node.key);
});

console.log('//////////// DEPTH FIRST SEARCH ///////////////');

const graph3 = createGraph(true);

nodes.forEach(node => {
  graph3.addNode(node)
});

edges.forEach(nodes => {
  graph3.addEdge(...nodes)
});

graph3.depthFirstSearch('a', node => {
  console.log(node.key);
})
