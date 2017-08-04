console.log('May Node be with you')

const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();

app.set('view engine', 'ejs')

var db

MongoClient.connect('mongodb://ramzstarer:ramzstar@ds115131.mlab.com:15131/starwarsquotes', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})