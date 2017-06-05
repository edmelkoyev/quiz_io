// index.js
const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const port = process.env.PORT || process.env.SERVER_PORT || 3000

const app = express()

app.use(express.static('public'))

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (request, response) => {
  response.render('home', {
    name: 'Home'
  })
})

app.get('/was/take', (request, response) => {
  response.render('interactions/was/take', {
    instanceKey: request.query.instanceKey,
    name: 'Take',
    layout: 'was'
  })
})

app.get('/was/result', (request, response) => {
  response.render('interactions/was/result', {
    instanceKey: request.query.instanceKey,
    name: 'Result',
    layout: 'was'
  })
})

app.get('/was/edit', (request, response) => {
  response.render('interactions/was/edit', {
    instanceKey: request.query.instanceKey,
    name: 'Edit',
    layout: 'was'
  })
})

app.get('/was/show', (request, response) => {
  response.render('interactions/was/show', {
    instanceKey: request.query.instanceKey,
    name: 'Show',
    layout: 'was'
  })
})

app.use((err, request, response, next) => {
  // log the error, for now just console.log
  console.log(err)
  response.status(500).send('Something broke!')
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})