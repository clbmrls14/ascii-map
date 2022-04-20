const countOccurrences = (arr, val) => {
  var occurences = 0;

  arr.forEach((subArray) => {
    subArray.forEach((element) => {
      if (element === val) {
        occurences += 1;
      }
    });
  });

  return occurences;
};

module.exports = { countOccurrences };
