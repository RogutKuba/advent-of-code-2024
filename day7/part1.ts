import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.split('\n').map((line) => {
  const [target, value] = line.split(':');
  return {
    target: BigInt(target),
    values: value.split(' ').slice(1).map(BigInt),
  };
});

/**
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
 */

let total: bigint = BigInt(0);
let added = 0;

const dfs = (cur: bigint, values: bigint[], target: bigint, str: string) => {
  if (values.length === 0) return cur === target;

  // multiply or divide
  const curVal = values[0];

  // console.log(cur, typeof values.length);

  // if (i === endIndex) {
  // if (cur * curVal === BigInt(target)) {
  //   console.log('mul res:', str + ` * ${curVal.toString()}`);
  //   return true;
  // }
  // if (cur + curVal === BigInt(target)) {
  //   console.log('add res', str + ` + ${curVal.toString()}`);
  //   return true;
  // }
  // }

  return (
    dfs(cur * curVal, values.slice(1), target, str + ` * ${curVal}`) ||
    dfs(cur + curVal, values.slice(1), target, str + ` + ${curVal}`)
  );
};

lines.forEach((line, index) => {
  const canEquate = dfs(BigInt(1), line.values, line.target, '');

  if (canEquate) {
    // console.log(`${line.target}: ${line.values} is good`);
    // console.log('good on index:', index, line.target);

    const big = BigInt(line.target);
    total = total + big;
    added++;
  }
});

console.log('sum', total);
console.log('added', added, lines.length);
