import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8').split('\n');

const grid: string[][] = (() => {
  const result: string[][] = [];

  input.forEach((line) => {
    result.push(line.split(''));
  });

  return result;
})();

const startingX = grid.findIndex((line) => line.includes('^'));
const startingY = grid[startingX].findIndex((c) => c === '^');

const visited: Set<string> = new Set();

const moveGuard = (x: number, y: number, rawDirection: number) => {
  const direction = rawDirection % 4;

  // 0 is up, 1 is right, 2 is down, 3 is left

  const [nextX, nextY] = (() => {
    switch (direction) {
      case 0:
        return [x - 1, y];
      case 1:
        return [x, y + 1];
      case 2:
        return [x + 1, y];
      case 3:
        return [x, y - 1];
      default:
        throw new Error('Invalid direction');
    }
  })();

  if (
    nextX < 0 ||
    nextX >= grid.length ||
    nextY < 0 ||
    nextY >= grid[nextX].length
  ) {
    return;
  }

  const nextPos = grid[nextX][nextY];

  if (nextPos === '#') {
    moveGuard(x, y, rawDirection + 1);
  } else {
    const key = `${nextX},${nextY}`;
    visited.add(key);
    moveGuard(nextX, nextY, rawDirection);
  }
};

visited.add(`${startingX},${startingY}`);
moveGuard(startingX, startingY, 0);

const printMovedGrid = () => {
  const movedGrid = grid.map((line) => line.slice());

  visited.forEach((key) => {
    const [x, y] = key.split(',').map(Number);
    movedGrid[x][y] = 'X';
  });

  // print line number, with min 3 digits
  console.log(
    movedGrid
      .map((line, i) => `${i.toString().padStart(3, ' ')}: ${line.join('')}`)
      .join('\n')
  );

  // console.log('\n\nstarting position', grid[startingX][startingY]);
};

console.log('total visited', visited.size);
printMovedGrid();
