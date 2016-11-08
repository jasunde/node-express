// node / express application
var path = require('path')
var bodyParser = require('body-parser')
var express = require('express')
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.set('port', process.env.PORT || 3000)

// data
var songs = [
  {
    artist: "Bruce Springsteen",
    title: "Born in the U.S.A"
  }
]

// routes
app.post('/songs', function (req, res) {
  var newSong = req.body
  songs.push(newSong);
  res.sendStatus(201)
})

app.get('/songs', function (req, res) {
  console.log('Handling request for songs')
  // res.sendStatus(200)
  res.send(songs)
})

// static file routing
app.get('/*', function (req, res) {
  var file = req.params[0] || 'views/index.html'
  res.sendFile(path.join(__dirname, './public/', file))
})

app.listen(app.get('port'), function () {
  console.log('Server is listening on port ' + app.get('port') + '...')
})
