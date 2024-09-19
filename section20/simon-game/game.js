const gamePattern = []
const userClickedPattern = []

const buttonColors = [
  'red',
  'blue',
  'green',
  'yellow',
]

function nextSequence() {
  const randomNumber = Math.floor(Math.random() * 4)
  const randomChosenColor = buttonColors[randomNumber]

  gamePattern.push(randomChosenColor)
  playSound(randomChosenColor)
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
