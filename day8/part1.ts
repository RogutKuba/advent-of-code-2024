import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8');

const grid = input.split('\n').map((l) => l.split(''));

const freqMap = new Map<string, { x: number; y: number }[]>();

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid.length; j++) {
    if (grid[i][j] !== '.') {
      const f = grid[i][j];
      freqMap.set(f, [...(freqMap.get(f) ?? []), { x: i, y: j }]);
    }
  }
}

// loop through each freq and put anti spots

const copiedGrid = [...grid.map((l) => [...l])];

const allFreq = freqMap.keys();

let pos = 0;
const seen = new Set<string>();

for (const freq of allFreq) {
  // console.log('freq', freq);
  const allPositions = freqMap.get(freq) ?? [];
  // const allPositions = [{ x: 5, y: 5 }];

  // loop through each position of grid relative to each point, and see if the inverse exists in set
  for (const point of allPositions) {
    // const i = 7;
    // const j = 6;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (grid[i][j] === freq) continue;

        const xDiff = point.x - i;
        const yDiff = point.y - j;
        const checkX = point.x + xDiff;
        const checkY = point.y + yDiff;

        if (
          checkX >= 0 &&
          checkX < grid.length &&
          checkY >= 0 &&
          checkY < grid[0].length
        ) {
          // console.log({
          //   checkX,
          //   checkY,
          //   xLen: grid.length,
          //   yLen: grid[0].length,
          //   gridChar: grid[checkX][checkY],
          //   freq,
          // });
          // check if it is same freq
          if (grid[checkX][checkY] === freq) {
            const key = `${i}-${j}`;

            const hasKey = seen.has(key);
            // console.log('key', freq, key, 'hasKey', hasKey, pos);

            if (!hasKey) {
              seen.add(key);
              copiedGrid[i][j] = '#';
              pos++;
            }
          }
        }
      }
    }
  }
}

const printGrid = (grid: string[][]) => {
  for (const line of grid) {
    console.log(line.join(''));
  }
};

printGrid(copiedGrid);

console.log('sum', pos);
