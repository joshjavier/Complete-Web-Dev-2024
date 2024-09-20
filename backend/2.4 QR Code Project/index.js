/*
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import * as fs from 'node:fs'
import inquirer from 'inquirer'
import qr from 'qr-image'

/**
 * Generates a QR code image from a URL
 * @param {string} url
 */
function generateQR(url) {
  qr.image(url).pipe(fs.createWriteStream('qr_img.png'))
  console.log('The QR code has been saved!')
}

/**
 * Saves user input in a txt file
 * @param {string} text
 */
function saveUserInput(text) {
  fs.writeFile('URL.txt', text, (err) => {
    if (err) throw err
    console.log('The file has been saved!')
  })
}

inquirer
  .prompt([
    {
      type: 'input',
      name: 'url',
      message: 'Enter a URL:',
    },
  ])
  .then((answers) => {
    const { url } = answers
    generateQR(url)
    saveUserInput(url)
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment")
    } else {
      console.log(error)
    }
  })
