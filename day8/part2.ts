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

  for (let i = 0; i < allPositions.length; i++) {
    const parent = allPositions[i];

    for (let j = 0; j < allPositions.length; j++) {
      if (i === j) continue;
      const child = allPositions[j];

      // console.log({
      //   parent,
      //   child,
      // });

      const xDiff = parent.x - child.x;
      const yDiff = parent.y - child.y;

      let checkX = parent.x;
      let checkY = parent.y;

      // console.log({
      //   xDiff,
      //   yDiff,
      // });

      while (
        checkX >= 0 &&
        checkX < grid.length &&
        checkY >= 0 &&
        checkY < grid[0].length
      ) {
        // console.log('now checking', {
        //   checkX,
        //   checkY,
        // });
        const key = `${checkX}-${checkY}`;

        const hasKey = seen.has(key);
        // console.log('key', freq, key, 'hasKey', hasKey, pos);

        if (!hasKey) {
          seen.add(key);
          copiedGrid[checkX][checkY] = '#';
          pos++;
        }

        checkX += xDiff;
        checkY += yDiff;
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
