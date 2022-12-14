const data = document.querySelector('pre').innerText.trim();
const input = data.replace(/\n\n/g, '|').split('|');
let minDivisibleMultiples = 1;


const startingMonkeys = input.map((monkeyData) => {
  const info = monkeyData.replace(/\n\s*/g, '|').split('|');
  const divisibleConditional = +(info[3].replace('Test: divisible by ', ''));

  // Find the minimum divisible multiples of divisible conditionals
  // We will use this to find the least common multiple
  minDivisibleMultiples *= divisibleConditional;

  return {
    name: info[0].replace(':', ''),
    items: info[1].replace('Starting items: ', '').split(', ').map(Number),
    operation: getOperation(info[2].replace('Operation: ', '')),
    conditional: divisibleConditional,
    throwTo: getThrowIndex(info[4], info[5]),
  };
});

// Run each of part, not together, cause the variants' reactivity
// const part1 = () => {
//   [top1, top2, ...other] = getInspectTimes(20, 3).sort((a, b) => b - a);
//   return top1 * top2;
// };
// console.log(part1());

const part2 = () => {
  [top1, top2, ...other] = getInspectTimes(10000, 1).sort((a, b) => b - a);
  console.log('part 2', top1 * top2);
};
part2();

function getInspectTimes(totalRound, boredLevel) {
  let newMonkeys = [...startingMonkeys];

  const inspectTimes = [];

  for (let i = 0; i < totalRound; i++) {
    newMonkeys.forEach((monkey, index) => {
      inspectTimes[index] = inspectTimes[index]
        ? inspectTimes[index] + monkey.items.length
        : monkey.items.length;

      if (monkey.items.length) {
        newMonkeys = throwItems([...newMonkeys], monkey, index, boredLevel);
      }
    });
  }

  console.log(inspectTimes);

  return inspectTimes;
}

function throwItems(monkeys, currentMonkey, index, boredLevel) {
  const newMonkeys = [...monkeys];

  currentMonkey.items.forEach((item) => {
    const newWorry = Math.floor(getNewValue(item, currentMonkey.operation) / (boredLevel || 1));

    // The worry before pass to the next monkey
    const worry = (newWorry % minDivisibleMultiples) + minDivisibleMultiples;

    // Check condition and throw item to other monkey
    if (worry % currentMonkey.conditional === 0) {
      newMonkeys[currentMonkey.throwTo[0]].items.push(worry);
    } else {
      newMonkeys[currentMonkey.throwTo[1]].items.push(worry);
    }
  });

  // Reset the current monkey's items
  newMonkeys[index].items = [];
  return newMonkeys;
}

function getOperation(operationFull) {
  const operation = operationFull.replace('new = ', '');

  const operator = operation.match(/[\+\-\*\/]/)[0];

  const [a, b] = operation.split(operator);

  return [a.trim(), operator, b.trim()];
}

function getThrowIndex(testTrue, testFalse) {
  return [
    +testTrue.replace('If true: throw to monkey ', ''),
    +testFalse.replace('If false: throw to monkey ', ''),
  ]
}

function getNewValue(old, operation) {
  const a = +(operation[0] === 'old' ? old : operation[0]);
  const b = +(operation[2] === 'old' ? old : operation[2]);

  switch (operation[1]) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
    default:
      return a;
  }
}
