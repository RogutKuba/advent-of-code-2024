import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8');

const rawLines = input.split('\n');
const lists = rawLines.map((line) => line.split('  ').map(Number));

const list1 = lists.map((list) => list[0]).sort();
const list2 = lists.map((list) => list[1]).sort();

const matchedDifferences = list1.map((e1, index) => {
  const e2 = list2[index];

  const diff = Math.abs(e1 - e2);

  console.log({
    e1,
    e2,
    diff,
  });

  return diff;
});

const sum = matchedDifferences.reduce((acc, curr) => acc + curr, 0);

console.log('sum', sum);
