import express from 'express'
import axios, { AxiosError } from 'axios'

const app = express()
const port = 3000
const API_URL = 'https://secrets-api.appbrewery.com'

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/random`)
    const { secret, username } = response.data
    res.render('index.ejs', { secret, user: username })
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message)
    } else {
      console.error('Unknown Error:')
      console.log(error)
    }

    res.render('index.ejs', { secret: 'Server Error', user: '' })
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
