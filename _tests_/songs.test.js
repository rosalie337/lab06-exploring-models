const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const Song = require('../lib/models/songs');
const pool = require('../lib/utils/pool');

describe('app routes for song model', () => {
    
  beforeAll(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  
  afterAll(() => {
    return pool.end();
  });

  it('adds a song via POST', async() => {
                
    const data = await request(app)
      .post('/songs')
      .send({
        artist:'mos def', 
        title: 'Umi', 
        album: 'Black on Both Sides'
      });
                    
    expect(data.body).toEqual({
      id: '1',
      artist:'mos def', 
      title: 'Umi', 
      album: 'Black on Both Sides'
    });
  });

  it('Returns all songs via GET', async() => {
        
    const data = await request(app)
      .get('/songs');
        
    expect(data.body).toEqual([{
      id: '1',
      artist:'mos def', 
      title: 'Umi', 
      album: 'Black on Both Sides'
    }]);
  });

  it('returns a song using via GET', async() => {
  
    const data = await request(app)
      .get('/songs/1');
      
    expect(data.body).toEqual({
      id: '1',
      artist:'mos def', 
      title: 'Umi', 
      album: 'Black on Both Sides'
    });
  });

  it('updates one song via PUT', async() => {
    const song = await Song.insert({
      artist:'Common', 
      title: 'Time Traveling', 
      album: 'Like Water to Chocolate' 
    });

    const data = await request(app)
      .put(`/songs/${song.id}`)
      .send({
        artist:'Common', 
        title: 'Time Travelin\'', 
        album: 'Like Water For Chocolate'
      });

    expect(data.body).toEqual({
      ...song,
      artist:'Common', 
      title: 'Time Travelin\'', 
      album: 'Like Water For Chocolate' 
    });
  });

  it('deletes a song via DELETE', async() => {

    const data = await request(app)
      .delete('/songs/1')
      .send({
        artist:'mos def', 
        title: 'Umi', 
        album: 'Black on Both Sides'
      });

    expect(data.body).toEqual({
      id: '1',
      artist:'mos def', 
      title: 'Umi', 
      album: 'Black on Both Sides'
    });
  });

});
