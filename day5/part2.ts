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
const incorrectPages: number[][] = [];

const reformatBadPage = (page: number[]) => {
  const result: number[] = [];

  const exists = new Set<number>();
  const seen = new Set<number>();

  page.forEach((n) => exists.add(n));

  // console.log('working on page', page);

  let pageIdx = 0;
  let queue: number[] = [];

  while (queue.length > 0 || pageIdx < page.length) {
    const cur = queue.shift() ?? page[pageIdx++];

    if (seen.has(cur)) {
      continue;
    }

    const deps = needsBeforeMap.get(cur) ?? [];

    const stillNeeds = deps.filter((d) => exists.has(d) && !seen.has(d));

    if (stillNeeds.length === 0) {
      // add number to result and move on
      seen.add(cur);
      result.push(cur);
    } else {
      // add dependencies to end of queue and add itself to end
      queue.push(...stillNeeds);
      queue.push(cur);
    }
  }

  // // loop through each element and make sure number
  // page.forEach((num) => {
  //   console.log('want to add', num);
  //   console.log('has dependencies', needsBeforeMap.get(num));

  //   for (const mustBeBefore of needsBeforeMap.get(num) ?? []) {
  //     if (exists.has(mustBeBefore) && !seen.has(num)) {
  //       // need to add dependencies
  //       console.log('adding', mustBeBefore, 'from dependencies');
  //       result.push(num);
  //       seen.add(num);
  //     }
  //   }

  //   if (!seen.has(num)) {
  //     console.log('adding from array', num);
  //     result.push(num);
  //     seen.add(num);
  //   }
  // });

  return result;
};

pages.forEach((page) => {
  const exists = new Set<number>();
  const seen = new Set<number>();
  let isGood = true;

  page.forEach((n) => exists.add(n));

  page.forEach((num) => {
    if (isGood === false) return;

    for (const mustBeBefore of needsBeforeMap.get(num) ?? []) {
      if (seen.has(mustBeBefore) === false && exists.has(mustBeBefore)) {
        // console.log(
        //   'page',
        //   page,
        //   'is wrong!',
        //   mustBeBefore,
        //   'must be before',
        //   num
        // );
        isGood = false;
        incorrectPages.push(page);

        // need to reformat page
        const reformatted = reformatBadPage(page);
        // console.log('original', page);
        // console.log('reformatted', reformatted);
        // console.log('\n');
        const mid = Math.floor(reformatted.length / 2);
        // console.log('adding ', reformatted[mid]);
        sum += reformatted[mid];

        break;
      }
    }

    seen.add(num);
  });
});

console.log(sum);
