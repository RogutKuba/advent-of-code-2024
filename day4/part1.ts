import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8');

const totalGrid = input.split('\n').map((row) => row.split(''));
const WORD_TO_FIND = ['X', 'M', 'A', 'S'];

let numSeen = 0;

const dfs = (i: number, j: number) => {
  const directions: [number, number][] = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  // loop through each step
  for (const dir of directions) {
    let matches = true;

    for (let step = 0; step < 4; step++) {
      const x = i + step * dir[0];
      const y = j + step * dir[1];

      if (x < 0 || x >= totalGrid.length) {
        matches = false;
        break;
      }
      if (y < 0 || y >= totalGrid[0].length) {
        matches = false;
        break;
      }

      // add dir to i and j and see if matches
      const curChar = totalGrid[x][y];
      const compareChar = WORD_TO_FIND[step];

      if (curChar !== compareChar) matches = false;
    }

    if (matches) {
      // console.log(
      //   'starting from ',
      //   i,
      //   j,
      //   'going in dir: ',
      //   dir,
      //   'was found to be true'
      // );
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

console.log('numSeen', numSeen);
