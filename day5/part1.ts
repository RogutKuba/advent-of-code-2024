import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8');

const splitInput = input.split('\n\n');

// rule are given in format X|Y
// X needs to be shown before Y
const rules = splitInput[0].split('\n').map((line) => {
  const [x, y] = line.split('|').map(Number);
  return { x, y };
});
const pages = splitInput[1]
  .split('\n')
  .map((line) => line.split(',').map(Number));

// needs before map
// Y -> [X, X]
const needsBeforeMap = new Map<number, number[]>();
rules.forEach((r) => {
  const curr = needsBeforeMap.get(r.y);

  if (!curr) {
    needsBeforeMap.set(r.y, [r.x]);
  } else {
    curr.push(r.x);
  }
});

let sum = 0;

pages.forEach((page) => {
  const exists = new Set<number>();
  const seen = new Set<number>();
  let isGood = true;

  // console.log('checking page', page);

  page.forEach((n) => exists.add(n));

  page.forEach((num) => {
    if (isGood === false) return;

    for (const mustBeBefore of needsBeforeMap.get(num) ?? []) {
      if (seen.has(mustBeBefore) === false && exists.has(mustBeBefore)) {
        // console.log(
        //   'broke on num:',
        //   num,
        //   'since',
        //   mustBeBefore,
        //   'is not before'
        // );
        isGood = false;
      }
    }

    seen.add(num);
  });

  if (isGood) {
    const mid = Math.floor(page.length / 2);
    const midNum = page[mid];
    // console.log('isGood midNum =', midNum);
    sum += midNum;
  }
});

console.log('sum', sum);
