const input = document.querySelector('pre').innerText.trim().replace(/\n/g, '|');

const forest = input.split('|').map(function (line) {
	return line.split('').map(function (char) {
		return +char;
	});
});

const width = forest[0].length;
const height = forest.length;
let visibleTrees = width * 2 + height * 2 - 4;

// # Part 1
const checkTop = function (x, y) {
	const tall = forest[x][y];

	for (let i = x - 1; i >= 0; i--) {
		if (forest[i][y] >= tall) {
			return false;
		}
	}

	return true;
}

const checkBottom = function (x, y) {
	const tall = forest[x][y];

	for (let i = x + 1; i < height; i++) {
		if (forest[i][y] >= tall) {
			return false;
		}
	}

	return true;
}

const checkLeft = function (x, y) {
	const tall = forest[x][y];

	for (let i = y - 1; i >= 0; i--) {
		if (forest[x][i] >= tall) {
			return false;
		}
	}

	return true;
}

const checkRight = function (x, y) {
	const tall = forest[x][y];

	for (let i = y + 1; i < width; i++) {
		if (forest[x][i] >= tall) {
			return false;
		}
	}

	return true;
}

const isVisible = function (x, y) {
	return checkTop(x, y) || checkBottom(x, y) || checkLeft(x, y) || checkRight(x, y);
}

for (let i = 1; i < width - 1; i++) {
	for (let j = 1; j < height - 1; j++) {
		if (isVisible(i, j)) {
			visibleTrees++;
		}
	}
}

console.log(visibleTrees);

// # Part 2
const leftVision = function (x, y) {
	const tall = forest[x][y];
	let vision = 0;

	for (let i = y - 1; i >= 0; i--, vision++) {
		if (forest[x][i] >= tall) {
			return vision + 1;
		}
	}

	return vision;
}

const rightVision = function (x, y) {
	const tall = forest[x][y];
	let vision = 0;

	for (let i = y + 1; i < width; i++, vision++) {
		if (forest[x][i] >= tall) {
			return vision + 1;
		}
	}

	return vision;
}

const topVision = function (x, y) {
	const tall = forest[x][y];
	let vision = 0;

	for (let i = x - 1; i >= 0; i--, vision++) {
		if (forest[i][y] >= tall) {
			return vision + 1;
		}
	}

	return vision;
}

const bottomVision = function (x, y) {
	const tall = forest[x][y];
	let vision = 0;

	for (let i = x + 1; i < height; i++, vision++) {
		if (forest[i][y] >= tall) {
			return vision + 1;
		}
	}

	return vision;
}

const calculateScenicScore = function (x, y) {
	return leftVision(x, y) * rightVision(x, y) * topVision(x, y) * bottomVision(x, y);
}

let maxScore = 0;


for (let i = 0; i < width; i++) {
	for (let j = 0; j < height; j++) {
		maxScore = Math.max(maxScore, calculateScenicScore(i, j));
	}
}

console.log(maxScore);
