const data = require('./day-09-input.js');
const input = data.replace(/\n/g, '|').split('|');

const moves = input.map(function (move) {
	return move.split(' ');
})

function getDirection(head, tail) {
	deltaX = head.x - tail.x;
	deltaY = head.y - tail.y;
	result = '';

	if (deltaX > 0) {
		result += 'R';
	} else if (deltaX < 0) {
		result += 'L';
	}

	if (deltaY > 0) {
		result += 'U';
	} else if (deltaY < 0) {
		result += 'D';
	}

	return result;
}

function isFarAway(head, tail) {
	return Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1;
}

function tailPosition(head, tail) {
	let {x, y} = tail;

	if (isFarAway(head, tail)) {
		const direction = getDirection(head, tail);

		if (direction.includes('R')) {
			x++;
		}

		if (direction.includes('L')) {
			x--;
		}

		if (direction.includes('U')) {
			y++;
		}

		if (direction.includes('D')) {
			y--;
		}
	}

	return {x, y};
}

function headPosition(head, direction) {
	const newPosition = {...head};

	switch (direction) {
		case 'R':
			newPosition.x++;
			break;
		case 'L':
			newPosition.x--;
			break;
		case 'U':
			newPosition.y++;
			break;
		case 'D':
			newPosition.y--;
			break;
	}

	return newPosition;
}

function createRope(totalKnots) {
	const rope = [];

	for (let i = 0; i < totalKnots; i++) {
		rope.push({
			x: 0,
			y: 0,
		});
	}

	return rope;
}

function getTailPositions(rope, moves) {
	const tailPositions = [];

	moves.forEach(function (move) {
		const [direction, distance] = move;

		for (let i = 0; i < distance; i++) {
			// Move rope
			for (let j = 0; j < rope.length; j++) {
				if (j === 0) {
					rope[j] = headPosition(rope[j], direction);
				}

				if (j === rope.length - 1) {
					tailPositions.push(rope[j]);
				} else {
					rope[j + 1] = tailPosition(rope[j], rope[j + 1]);
				}
			}
		}
	});

	return tailPositions;
};

// Part 1
const rope1 = createRope(2);

const tailPositions1 = getTailPositions(rope1, moves);

let set  = new Set(tailPositions1.map(JSON.stringify));
const result1 = Array.from(set).map(JSON.parse).length;

console.log(result1);

// Part 2
const rope2 = createRope(10);

const tailPositions2 = getTailPositions(rope2, moves);

set  = new Set(tailPositions2.map(JSON.stringify));
const result2 = Array.from(set).map(JSON.parse).length;

console.log(result2);
