import app  from '../app'
import request from 'supertest'

// create a test to test the http api
describe('GET /api/moods', () => {
    test('should return 200 OK', () => {
        return request(app).get('/api/moods').expect(200)
    })
    }
)



