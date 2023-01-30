import { expectedError } from "@babel/core/lib/errors/rewrite-stack-trace";
import  request  from "supertest";
import app from "../src/app";

jest.mock('../src/services/userService');

describe('userController Test Suite', ()=>{
    test('get should return an array of users.',async ()=>{
        let response = await request(app).get('/users');
        expect(response.statusCode).toBe(200);
        let users = response.body;
        expect(users.length).toBeGreaterThan(0);
        expect(users[0]._id).toBe('1');
    });
    test.only('post should return an array of users.',async ()=>{
        let user = {username: 'test002'};
        let response = await request(app).post('/users').send(user);
        console.log('response test only',response)
        expect(response.statusCode).toBe(201);
        let body = response.body;
        expect(body.length).toBe('24');
        // 63d79bf6f8f543f51bba5655
        
    });


})