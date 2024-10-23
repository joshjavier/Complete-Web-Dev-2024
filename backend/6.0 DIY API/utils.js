/**
 * Generate a random number
 * @param {number} max The maximum number, usually array length
 * @returns A random integer
 */
export function rng(max = 1) {
  return Math.floor(Math.random() * max)
}
