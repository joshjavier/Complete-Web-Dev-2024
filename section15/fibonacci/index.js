function fibonacciGenerator (n) {
  //Do NOT change any of the code above 👆

  let result = [1, 0];

  if (n === 1) {
    result = [0];
  } else {
    for (let i = 2; i < n; i++) {
      let f = result[0] + result[1];
      result = [f, ...result];
    }
  }

  return result.reverse();

  //Return an array of fibonacci numbers starting from 0.

  //Do NOT change any of the code below 👇
}
