import request from 'supertest'
import express from 'express'


import app from '../app'

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

request(app, { http2: true })
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });