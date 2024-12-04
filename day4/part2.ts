import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8');

const totalGrid = input.split('\n').map((row) => row.split(''));
console.log(totalGrid);

const WORD_TO_FIND = ['X', 'M', 'A', 'S'];

let numSeen = 0;

const horizFlips: [number, number][] = [
  [1, 1],
  [1, -1],
];

const horizCmp: {
  dir: [number, number];
  char: string;
}[] = [
  {
    dir: [0, 0],
    char: 'A',
  },
  {
    dir: [-1, -1],
    char: 'M',
  },
  {
    dir: [1, -1],
    char: 'M',
  },
  {
    dir: [-1, 1],
    char: 'S',
  },
  {
    dir: [1, 1],
    char: 'S',
  },
];

const vertFlips: [number, number][] = [
  [1, 1],
  [-1, 1],
];

const vertCmp: {
  dir: [number, number];
  char: string;
}[] = [
  {
    dir: [0, 0],
    char: 'A',
  },
  {
    dir: [-1, -1],
    char: 'M',
  },
  {
    dir: [-1, 1],
    char: 'M',
  },
  {
    dir: [1, -1],
    char: 'S',
  },
  {
    dir: [1, 1],
    char: 'S',
  },
];

const dfs = (i: number, j: number) => {
  for (const flip of horizFlips) {
    let matches = true;

    const curPoints: [number, number, string][] = [];

    // loop through each step for horizontal flip
    for (const curr of horizCmp) {
      const x = i + curr.dir[0] * flip[0];
      const y = j + curr.dir[1] * flip[1];

      if (x < 0 || x >= totalGrid.length) {
        matches = false;
        break;
      }
      if (y < 0 || y >= totalGrid[0].length) {
        matches = false;
        break;
      }

      if (totalGrid[x][y] !== curr.char) {
        matches = false;
        break;
      }

      curPoints.push([x, y, `${totalGrid[x][y]} === ${curr.char}`]);
    }

    if (matches) {
      // console.log('center point at', i, j, 'from flip', flip);
      // console.log('points taken were', curPoints);

      numSeen++;
    }
  }

  for (const flip of vertFlips) {
    let matches = true;

    const curPoints: [number, number, string][] = [];

    // loop through each step for vert flip
    for (const curr of vertCmp) {
      const x = i + curr.dir[0] * flip[0];
      const y = j + curr.dir[1] * flip[1];

      if (x < 0 || x >= totalGrid.length) {
        matches = false;
        break;
      }
      if (y < 0 || y >= totalGrid[0].length) {
        matches = false;
        break;
      }

      if (totalGrid[x][y] !== curr.char) {
        matches = false;
        break;
      }

      curPoints.push([x, y, `${totalGrid[x][y]} === ${curr.char}`]);
    }

    if (matches) {
      // console.log('center point at', i, j, 'from flip', flip);
      // console.log('points taken were', curPoints);

      numSeen++;
    }
  }
};

for (let i = 0; i < totalGrid.length; i++) {
  for (let j = 0; j < totalGrid[i].length; j++) {
    // run dfs on each point to find the word
    dfs(i, j);
  }
}
// dfs(1, 1);

console.log('numSeen', numSeen);
