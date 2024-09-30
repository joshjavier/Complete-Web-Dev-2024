import express from 'express'

const app = express()
const port = 3000

function getAdvice() {
  const today = new Date()
  const type = today.getDay() === 0 || today.getDay() === 6 ? 'the weekend' : 'a weekday'
  const advice = type === 'a weekday' ? 'work hard' : 'have fun'
  return { type, advice }
}

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  const week = getAdvice()
  res.render('index.ejs', { week })
})

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
})
