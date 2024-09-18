/** @type {HTMLImageElement} */
const player1Dice = document.querySelector('.dice .img1')
/** @type {HTMLImageElement} */
const player2Dice = document.querySelector('.dice .img2')
/** @type {HTMLHeadingElement} */
const title = document.querySelector('h1')

/**
 * Generates a random dice value and image path
 * @returns {Object} dice - An object cantaining the random die's integer value and image path
 * @returns {string} dice.image
 * @returns {number} dice.value
 */
function rollDice() {
  const value = Math.floor(Math.random() * 6) + 1
  console.log(value)
  return { image: `images/dice${value}.png`, value }
}

/**
 * Roll player dice and update DOM
 * @param {HTMLImageElement} imgEl
 */
function updatePlayerDice(imgEl) {
  const dice = rollDice()
  imgEl.src = dice.image
  imgEl.alt = dice.value
}

/**
 * Announce the player with the higher value dice
 */
function announceResult() {
  if (Number(player1Dice.alt) > Number(player2Dice.alt))
    title.textContent = '🚩 Player 1 Wins!'

  if (Number(player1Dice.alt) < Number(player2Dice.alt))
    title.textContent = 'Player 2 Wins! 🚩'

  if (Number(player1Dice.alt) === Number(player2Dice.alt))
    title.textContent = 'Draw!'
}

updatePlayerDice(player1Dice)
updatePlayerDice(player2Dice)
announceResult()
