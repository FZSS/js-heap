//https://github.com/mourner/tinyqueue/blob/master/index.js
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

defaultCompare = (a, b) => a - b;

const test = () => {
  const a = new PriorityQueue([]);

  a.offer(1);
  a.offer(2);
  a.offer(3);
  a.offer(6);
  a.offer(9);
  a.offer(-10);
  a.offer(0);

  console.log(a.poll());
  console.log(a.peek());
  console.log(a.poll());
  console.log(a.poll());
}

test();