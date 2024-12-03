import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8');

const mulRegex = /mul\(([0-9]+),([0-9]+)\)/g;

const matches = input.match(mulRegex);

console.log(matches);

const sum = matches?.reduce((acc, curr) => {
  const rawNums = curr.replace('mul(', '').replace(')', '').split(',');
  console.log(Number(rawNums[0]), Number(rawNums[1]));
  return acc + Number(rawNums[0]) * Number(rawNums[1]);
}, 0);

console.log(sum);
