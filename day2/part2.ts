/**
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
 */

import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8');

const reports = input.split('\n');

const areLevelsGradual = (levels: number[]) => {
  // check if gradually increasing or decreasing
  const isInc = levels[1] - levels[0] > 0;

  let past = levels[0] + (isInc ? -1 : 1);

  for (let i = 1; i < levels.length; i++) {
    const curr = levels[i];

    // if increasing, we need curr to be greater
    if (isInc && curr <= past) return false;
    if (!isInc && curr >= past) return false;

    past = curr;
  }

  return true;
};

const checkLevelDiff = (levels: number[]) => {
  for (let i = 1; i < levels.length - 1; i++) {
    const curr = levels[i];

    // check to left and right if differ by at least 1 and at most 3
    const leftDiff = Math.abs(levels[i - 1] - curr);
    const rightDiff = Math.abs(levels[i + 1] - curr);

    if (leftDiff < 1 || rightDiff < 1) return false;
    if (leftDiff > 3 || rightDiff > 3) return false;
  }

  return true;
};

const safeReportsCount = reports.reduce((acc, report) => {
  const levels = report.split(' ').map(Number);

  if (areLevelsGradual(levels) && checkLevelDiff(levels)) return acc + 1;

  // try removing each index and see if it fixes it
  for (let i = 0; i < levels.length; i++) {
    // remove index i,
    const modLevels = [...levels];
    modLevels.splice(i, 1);

    if (areLevelsGradual(modLevels) && checkLevelDiff(modLevels))
      return acc + 1;
  }

  return acc;
}, 0);

console.log('count', safeReportsCount);
