// ----------------------------------------
//                Constants
// ----------------------------------------

const buttonColors = [
  'red',
  'blue',
  'green',
  'yellow',
]



// ----------------------------------------
//                  State
// ----------------------------------------

let level = 0
let started = false
let gamePattern = []
let userClickedPattern = []
let nextLevel



// ----------------------------------------
//                Functions
// ----------------------------------------

function nextSequence() {
  const randomNumber = Math.floor(Math.random() * 4)
  const randomChosenColor = buttonColors[randomNumber]

  // Add random color to the game pattern
  gamePattern.push(randomChosenColor)
  flashButton(randomChosenColor)
  playSound(randomChosenColor)

  // Announce the current level
  $('#level-title').text(`Level ${level}`)
  // Prepare for the next level
  level++

  // Start the game if not yet started
  if (!started) {
    started = true
  }
}

function flashButton(currentColor) {
  $(`#${currentColor}`).fadeOut(100).fadeIn(100)
}

function playSound(key) {
  const audiomap = {
    red: new Audio('sounds/red.mp3'),
    blue: new Audio('sounds/blue.mp3'),
    green: new Audio('sounds/green.mp3'),
    yellow: new Audio('sounds/yellow.mp3'),
    wrong: new Audio('sounds/wrong.mp3'),
  }

  audiomap[key].play()
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass('pressed')
  setTimeout(() => {
    $(`#${currentColor}`).removeClass('pressed')
  }, 100)
}

function pressButton(color) {
  playSound(color)
  animatePress(color)
  userClickedPattern.push(color)
}

/**
 * Returns true if the user clicks match the game pattern
 * @returns {boolean} matches
 */
function checkAnswer() {
  for (let i = 0; i < userClickedPattern.length; i++) {
    const color = gamePattern[i]
    const userColor = userClickedPattern[i]

    if (userColor !== color) {
      return false
    }
  }

  return true
}

function startOver() {
  started = false
  gamePattern = []
  userClickedPattern = []
  level = 0
}

function gameOver() {
  // End game and reset state
  startOver()

  // Sound fx
  playSound('wrong')

  // Update UI
  $('#level-title').text('Game Over, Press Any Key to Restart')
  $(document.body).addClass('game-over')
  setTimeout(() => {
    $(document.body).removeClass('game-over')
  }, 200)
}



// ----------------------------------------
//              Event handlers
// ----------------------------------------

// Add click handlers to buttons
$('.btn').on('click', function () {
  // Buttons are only clickable when the game has started
  // and we're not waiting for the next level to start.
  if (!started || nextLevel) return

  const userChosenColor = $(this).attr('id')
  pressButton(userChosenColor)

  if (!checkAnswer()) {
    gameOver()
    return
  }

  if (userClickedPattern.length === gamePattern.length) {
    // Empty the user array
    userClickedPattern = []
    // Start the next round after a delay
    nextLevel = setTimeout(() => {
      nextSequence()
      nextLevel = null
    }, 1000)
  }
})

// Start the game when any key is pressed
$(document).on('keydown', function () {
  if (started) return

  nextSequence()
})
