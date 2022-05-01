const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.head = null;
  }
  //privates
  insert(node, data) {
    if (!node) {
      return new Node(data);
    }
    if (node.data === data) {
      return node;
    }
    if (data < node.data) {
      node.left = this.insert(node.left, data);
    } else {
      node.right = this.insert(node.right, data);
    }
    return node;
  }

  search(node, data) {
    if (!node) {
      return null;
    }
    if (node.data === data) {
      return node;
    }
    return data < node.data
      ? this.search(node.left, data)
      : this.search(node.right, data);
  }

  hasData(node, data) {
    if (!node) {
      return false;
    }
    if (node.data === data) {
      return true;
    }
    return data < node.data
      ? this.hasData(node.left, data)
      : this.hasData(node.right, data);
  }

  deleteNode(node, data) {
    if (!node) {
      return null;
    }
    if (data < node.data) {
      node.left = this.deleteNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.deleteNode(node.right, data);
      return node;
    } else {
      if (!node.left && !node.right) {
        return null;
      }
      if (!node.left) {
        node = node.right;
        return node;
      }
      if (!node.right) {
        node = node.left;
        return node;
      }
      let minFromRight = node.right;
      while (minFromRight.left) {
        minFromRight = minFromRight.left;
      }
      node.data = minFromRight.data;
      node.right = this.deleteNode(node.right, minFromRight.data);
      return node;
    }
  }

  root() {
    return this.head;
  }

  add(data) {
    this.head = this.insert(this.head, data);
  }

  has(data) {
    return this.hasData(this.head, data);
  }

  find(data) {
    return this.search(this.head, data);
  }

  remove(data) {
    this.head = this.deleteNode(this.head, data);
  }

  min() {
    if (!this.head) {
      return;
    }
    let node = this.head;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this.head) {
      return;
    }
    let node = this.head;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
