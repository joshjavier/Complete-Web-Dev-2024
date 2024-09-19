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
