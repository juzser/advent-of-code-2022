const input = document.querySelector('pre').innerText.trim().replace(/\n/g, '|').split('|');

/**
 * Output
 * tree = {
 *   '/': {
 *     dir: object,
 *     size: number
 *   }
 * }
 */
let cursor = [];
const tree = {};
let part1 = 0;
let part2 = 999999999999999;

input.forEach((val, idx) => {
  // Command
  if (val.startsWith('$')) {
    // cd
    if (val.includes('$ cd')) {
      const targetDir = val.replace('$ cd ', '');

      if (targetDir === '..') {
        if (cursor.length > 0) {
          // # Part 1
          // Before pop, we check the size of the dir
          // if the size smaller than 100000, result will be increased.
          const size = getSizeByCursor(tree, [...cursor]);
          if (size < 100001) {
            part1 += size;
          }

          // # Part 2
          // Remaining unused size: x = 70000000 - tree['/'].size
          // The size need to be clean up: 30000000 - x
          if (size > 30000000 - 25725669) {
            part2 = Math.min(part2, size);
          }

          cursor.pop();
        }
      } else {
        cursor.push(targetDir);
        // console.log(cursor);
        mkdirRecursive(tree, [...cursor]);
      }
    }
  } else { // List of files and directories
    // Files
    if (!val.startsWith('dir')) {
      const size = +(val.split(' ')[0]);
      mkdirRecursive(tree, [...cursor], size);
    }
  }
});

console.log('Part 1', part1);
console.log('Part 2', part2);

function mkdirRecursive(parentTree, path, size) {
  if (path.length === 0) {
    return;
  }

  const dir = path.shift();
  if (!parentTree[dir]) {
    parentTree[dir] = {
      size: 0,
    };
  } else {
    if (size) {
      parentTree[dir].size += size;
    }
  }

  mkdirRecursive(parentTree[dir], path, size);
}

function getSizeByCursor(parentTree, path) {
  if (path.length === 0) {
    return parentTree.size;
  }

  const dir = path.shift();
  if (!parentTree[dir]) {
    return 0;
  }

  return getSizeByCursor(parentTree[dir], path);
}
