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
