import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8');

const rawLines = input.split('\n');
const lists = rawLines.map((line) => line.split('  ').map(Number));

const list1 = lists.map((list) => list[0]);
const list2 = lists.map((list) => list[1]);

const occurences = new Map<number, number>();

list2.forEach((number) => {
  const count = occurences.get(number) ?? 0;
  occurences.set(number, count + 1);
});

const sum = list1.reduce((acc, number) => {
  const toAdd = number * (occurences.get(number) ?? 0);
  return acc + toAdd;
}, 0);

console.log(sum);
