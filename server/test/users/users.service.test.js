const mongoose = require('mongoose');
const request = require('supertest');

const dbHandler = require('../db-handler');
const userService = require('../../users/user.service');
const userModel = require('../../users/user.model');

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

/**
 * Testing user for signup.
 */
describe('user', () => {

    /**
     * Tests that a valid user can be created through the userService without throwing any errors.
     */
    it('user can be created correctly', async (done) => {
        expect(async () => await userService.create(user))
            .not
            .toThrow();
        done();
    });

    it('Should save user to database', async done => {
        const res = await request.post('/signup')
          .send({
            name: 'Zell',
            email: 'testing@gmail.com'
          })
        done()
      })
});

/**
 * Complete product example.
 */
const user = {
    firstName: 'team',
    lastName: 'mango',
    email: 'teammango@gmail.com',
    password: '123456',
};