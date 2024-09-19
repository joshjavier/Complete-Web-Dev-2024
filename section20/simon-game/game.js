const gamePattern = []
const userClickedPattern = []

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
  flashButton($(`#${randomChosenColor}`))
  playSound(randomChosenColor)

  // Announce the current level
  $('#level-title').text(`Level ${level}`)
  // Prepare for the next level
  level++

  // Start the game!
  started = true
}

function flashButton(el) {
  $(el).fadeOut(100).fadeIn(100)
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

// Add click handlers to buttons
$('.btn').on('click', function () {
  const userChosenColor = $(this).attr('id')

  userClickedPattern.push(userChosenColor)
  playSound(userChosenColor)
  animatePress(userChosenColor)
  console.log(userClickedPattern)
})

// Start the game when any key is pressed
$(document).on('keydown', function () {
  if (started) return

  nextSequence()
})
