const data = document.querySelector('pre').innerText.trim();
const input = data.replace(/\n/g, '|').split('|');

let cycle = 1;
let x = 1;
let part1 = 0;
let screen = '\n';

input.forEach((command, index) => {
  if (command.startsWith('addx')) {
    const value = parseInt(command.replace('addx ', ''));
    addx(value);
  } else {
    noop();
  }
});

function noop() {
  cycle++;
  step(cycle, 0, true);
}

function addx(value) {
  for (i = 0; i < 2; i++) {
    cycle++;
    step(cycle, value, i === 1);
  }
}

function step(cycle, value, finished = false) {
  // Part 1
  if (
    cycle === 20
    || cycle === 60
    || cycle === 100
    || cycle === 140
    || cycle === 180
    || cycle === 220
  ) {
    part1 += x * cycle;
  }

  // Part 2
  if (cycle % 40 === 2 && cycle > 2) {
    screen += '\n';
    x += 40;
  }

  if (cycle > x && cycle < x + 4) {
    screen += '#';
  } else {
    screen += '.';
  }

  if (finished) {
    x += value;
  }
}

console.log('part1', part1);
console.log('part2', screen);
