const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

var app = express()

// 미들웨어
app.use(cors())

// 컨트롤러
const Calc = require('./controllers/calc.controller')

// Access-Control-Allow-Origin 적용방법1: 직접 헤더에 적용
app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
app.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  )
  next()
})

// root
app.get('/', (req, res) => {
  res.send('Root')
})
// calc
app.get('/calc', (req, res) => {
  res.sendFile(__dirname + '/public/calc.html')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, function () {
  console.log('start! express server on port 3000!')
})
