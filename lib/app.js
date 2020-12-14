const express = require('express');
const Song = require('./models/songs');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Mic Check, one, two, one two');
});

app.post('/songs', (req, res) => {
  Song
    .insert(req.body)
    .then(song => res.send(song));
  
});

app.get('/songs', (req, res) => {
  Song
    .find()
    .then(songs => res.send(songs));
});

app.get('/songs/:id', (req, res, next) => {
  Song
    .findById(req.params.id)
    .then(song => res.send(song))
    .catch(next);
});

app.put('/songs/:id', (req, res, next) => {
  Song
    .update(req.params.id, req.body)
    .then(song => res.send(song))
    .catch(next);
});

app.delete('/songs/:id', (req, res) => {
  Song
    .delete(req.params.id)
    .then(song => res.send(song));
});

module.exports = app;
