const gamePattern = []

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
}

function flashButton(el) {
  $(el).fadeOut(100).fadeIn(100)
}

function playSound(el) {
  const audiomap = {
    red: new Audio('sounds/red.mp3'),
    blue: new Audio('sounds/blue.mp3'),
    green: new Audio('sounds/green.mp3'),
    yellow: new Audio('sounds/yellow.mp3'),
  }

  audiomap[$(el).attr('id')].play()
}

// Add click handlers to buttons
$('.btn').on('click', function () {
  flashButton(this)
  playSound(this)
})
