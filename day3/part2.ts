import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8');

// mul(2,4) do() don't()
const mulRegex = /don't\(\)|do\(\)|mul\([0-9]+,[0-9]+\)/g;

const matches = input.match(mulRegex);

console.log(matches);

let isDo = true;

const sum = matches?.reduce((acc, curr) => {
  if (curr === 'do()') {
    isDo = true;
    return acc;
  } else if (curr === "don't()") {
    isDo = false;
    return acc;
  } else {
    const rawNums = curr.replace('mul(', '').replace(')', '').split(',');
    if (!isDo) return acc;

    return acc + Number(rawNums[0]) * Number(rawNums[1]);
  }
}, 0);

console.log(sum);
