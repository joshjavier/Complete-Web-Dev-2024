const set = document.querySelector('.set')
const buttons = document.querySelectorAll('.drum')

const keymap = {}
buttons.forEach(button => {
  keymap[button.textContent] = button
})

const audiomap = {
  w: new Audio('sounds/tom-1.mp3'),
  a: new Audio('sounds/tom-2.mp3'),
  s: new Audio('sounds/tom-3.mp3'),
  d: new Audio('sounds/tom-4.mp3'),
  j: new Audio('sounds/snare.mp3'),
  k: new Audio('sounds/crash.mp3'),
  l: new Audio('sounds/kick-bass.mp3'),
}

function playSound(key) {
  audiomap[key].currentTime = 0
  audiomap[key].play()
}

function animateButton(key) {
  const button = keymap[key]
  button.classList.add('pressed')
  setTimeout(() => {
    button.classList.remove('pressed')
  }, 250)
}

set.addEventListener('click', (event) => {
  if (!event.target.classList.contains('drum'))
    return

  const key = event.target.textContent
  playSound(key)
  animateButton(key)
})

document.addEventListener('keydown', (event) => {
  /** @type {HTMLButtonElement | undefined} */
  const drum = keymap[event.key]

  if (!drum) return

  drum.classList.add('pressed')
  audiomap[event.key].currentTime = 0
  audiomap[event.key].play()
})

document.addEventListener('keyup', (event) => {
  /** @type {HTMLButtonElement | undefined} */
  const drum = keymap[event.key]

  if (!drum) return

  drum.classList.remove('pressed')
})
