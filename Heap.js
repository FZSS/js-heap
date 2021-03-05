// https://github.com/FZSS/js-heap/blob/master/Heap.js
// heap invariant: each node has a smaller key than its children
class PriorityQueue {
  constructor(data = [], compare = defaultCompare) {
    this.data = data;
    this.length = this.data.length;
    this.compare = compare;

    if (this.data.length > 0) {
      // sink the first half of the element
      for (let i = (this.data.length >> 2) - 1; i >= 0; i -= 1) {
        this._down(i)
      }
    }
  }

  peek() {
    return this.data[0];
  }

  offer(item) {
    this.push(item);
  }

  poll() {
    return this.pop();
  }

  push(item) {
    this.data.push(item);
    this.length += 1;
    this._up(this.length - 1);
  }

  pop() {
    if (this.data.length === 0) return null;
    const top = this.data[0];

    this.length -= 1;

    // if this was the last item, simply remove
    if (this.length === 0) {
      this.data.pop();
    } else {
      // otherwise move the bottom to the front, and sink
      this.data[0] = this.data.pop();
      this._down(0);
    }

    return top;
  }

  _up(pos) {
    const {data, compare} = this;
    let i = pos; 

    while (i > 0) {
      const parent  = (i - 1) >> 1; 
      if (compare(data[i], data[parent]) >= 0) break; 
      [data[parent], data[i]] = [data[i], data[parent]];
      i = parent;
    }
  }

  _down(pos) {
    const {data, compare} = this;
    // we can stop at half length, because children is at 2*i+1, 2*i+2
    // if we go over half length, no children for us to see 
    const halfLength = this.length >> 1;
    let i = pos;

    while (i < halfLength) {
      const left = (i << 1) + 1;
      const right = left + 1;

      let child = left;

      // if right is smaller
      if (right < this.length && compare(data[right], data[left]) < 0) {
        child = right;
      }

      if (compare(data[child], data[i]) >= 0) break;
      [data[i], data[child]] = [data[child], data[i]];
      i = child;
    }
  }
}

// default to a mean heap
defaultCompare = (a, b) => a - b;