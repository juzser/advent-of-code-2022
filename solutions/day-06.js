// Get the input
const input = document.querySelector('pre').innerText.trim().split('');

// Common function
const getStartIndexByPart = (source, partLength) => {
  const start = source.findIndex((char, idx) => {
    const endIdx = idx + partLength;

    // Only check if the part is not out of bounds
    if (endIdx < source.length) {
      const part = source.slice(idx, endIdx);
      const unique = Array.from(new Set(part)); // Get unique values

      // No one leave behind!
      if (unique.length === partLength) {
        return true;
      }
    }

    return false;
  });

  return start + partLength;
}


// Part 1
getStartIndexByPart(input, 4);

// Part 2
getStartIndexByPart(input, 14);
