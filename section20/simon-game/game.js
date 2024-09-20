let gamePattern = []
let userClickedPattern = []

const buttonColors = [
  'red',
  'blue',
  'green',
  'yellow',
]

let level = 0
let started = false

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

  // Start the game!
  started = true
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
  }

  audiomap[key].play()
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass('pressed')
  setTimeout(() => {
    $(`#${currentColor}`).removeClass('pressed')
  }, 100);
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

// Add click handlers to buttons
$('.btn').on('click', function () {
  // Buttons are only clickable when the game has started and the
  // lengths of gamePattern and userClickedPattern are not equal.
  if (!started) return

  const userChosenColor = $(this).attr('id')

  // Save the user chosen color
  userClickedPattern.push(userChosenColor)
  playSound(userChosenColor)
  animatePress(userChosenColor)

  if (!checkAnswer()) {
    console.log('GAME OVER')
    started = false
    return
  }

  if (userClickedPattern.length === gamePattern.length) {
    // Empty the user array
    userClickedPattern = []
    // Start the next round after a delay
    setTimeout(() => {
      nextSequence()
    }, 1000)
  }
})

// Start the game when any key is pressed
$(document).on('keydown', function () {
  if (started) return

  nextSequence()
})
