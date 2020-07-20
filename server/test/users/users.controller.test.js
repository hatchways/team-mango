const request = require('supertest');

const userController = require('../../users/users.controller');
const mockUserService = require('../../users/user.service');

const express = require('express');

const initUserController = () => {
  const app = express();
  app.use(userController);
  return app;
}

jest.mock('../../users/user.service', () => ({
  authenticate: jest.fn(),
  create: jest.fn()
}));

afterAll(async done => {
  done();
});

describe('User Routes', () => {
  beforeEach(() => jest.clearAllMocks());

  test('User service create called on hitting POST /users/signup', async (done) => {
    await request(initUserController).post("/users/signup", user);
    expect(mockUserService.create()).toHaveBeenCalled();
    done();
  })
});

const user = {
    firstName: 'team',
    lastName: 'mango',
    email: 'teammango@gmail.com',
    password: '123456',
    confirmPassword: '123456',
};