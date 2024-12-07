import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8').split('\n');

const originalGrid: string[][] = (() => {
  const result: string[][] = [];

  input.forEach((line) => {
    result.push(line.split(''));
  });

  return result;
})();

const startingX = originalGrid.findIndex((line) => line.includes('^'));
const startingY = originalGrid[startingX].findIndex((c) => c === '^');

const printMovedGrid = (grid: string[][], visited: Set<string>) => {
  const movedGrid = grid.map((line) => line.slice());

  visited.forEach((key) => {
    const [x, y, direction] = key.split(',').map(Number);

    const directionChar = (() => {
      switch (direction) {
        case 0:
        case 2:
          return '|';
        case 1:
        case 3:
          return '-';
        default:
          throw new Error('Invalid direction');
      }
    })();
    movedGrid[x][y] = directionChar;
  });

  // print line number, with min 3 digits
  console.log(
    movedGrid
      .map((line, i) => `${i.toString().padStart(3, ' ')}: ${line.join('')}`)
      .join('\n')
  );

  // console.log('\n\nstarting position', grid[startingX][startingY]);
};

const checkIfCausesLoop = (
  newObstacleX: number,
  newObstacleY: number
): boolean => {
  const grid = originalGrid.map((line) => line.slice());

  grid[newObstacleX][newObstacleY] = 'O';

  const visited: Set<string> = new Set();
  visited.add(`${startingX},${startingY},0`);

  const moveGuard = (x: number, y: number, rawDirection: number) => {
    const direction = rawDirection % 4;

    // 0 is up, 1 is right, 2 is down, 3 is left
    const getNextCoords = (x: number, y: number, direction: number) => {
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
    };

    const [nextX, nextY] = getNextCoords(x, y, direction);

    if (
      nextX < 0 ||
      nextX >= grid.length ||
      nextY < 0 ||
      nextY >= grid[nextX].length
    ) {
      return false;
    }

    const nextPos = grid[nextX][nextY];

    if (nextPos === '#' || nextPos === 'O') {
      // check if we already have next position in visited
      const nextDirection = (direction + 1) % 4;
      const nextCoords = getNextCoords(x, y, nextDirection);

      const key = `${nextCoords[0]},${nextCoords[1]},${nextDirection}`;
      // console.log('key', key);
      if (visited.has(key)) {
        return true;
      }

      return moveGuard(x, y, rawDirection + 1);
    } else {
      const key = `${nextX},${nextY},${direction}`;

      if (visited.has(key)) {
        return true;
      }

      visited.add(key);
      return moveGuard(nextX, nextY, rawDirection);
    }
  };

  const result = moveGuard(startingX, startingY, 0);

  // printMovedGrid(grid, visited);

  // console.log('visited', visited);
  return result;
};

let sum = 0;

const totalCells = originalGrid.length * originalGrid[0].length;
let updateEvery = totalCells * 0.1;

// loop through all cells and if its empty place new obstacle
for (let i = 0; i < originalGrid.length; i++) {
  for (let j = 0; j < originalGrid[0].length; j++) {
    if (originalGrid[i][j] === '.') {
      // console.log('empty', i, j);

      const causesLoop = checkIfCausesLoop(i, j);
      if (causesLoop) {
        // console.log('causes loop', i, j);
        sum += 1;
      }
    }

    if (i * j > updateEvery) {
      console.log(`${i * j}/${totalCells} done`);
      updateEvery += totalCells * 0.1;
    }
  }
}

// const isLooping = checkIfCausesLoop(6, 3);
// console.log('isLooping', isLooping);
console.log('sum', sum);
