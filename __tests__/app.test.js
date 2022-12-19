import app from '../app'
import request from 'supertest'
import { jest } from '@jest/globals'



// test the root route
describe("GET /api/moods", () => {
	test("should return a 201 status code", async () => {
		const response = await request(app).get("/api/moods")
		expect(response.statusCode).toBe(201)
	})
	
	test("should specify json as the content type in the http header", async () => {
		const response = await request(app).get("/api/moods").send()
		expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
	})
})






