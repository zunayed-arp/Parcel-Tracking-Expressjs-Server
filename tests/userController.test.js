import { expectedError } from "@babel/core/lib/errors/rewrite-stack-trace";
import  request  from "supertest";
import app from "../src/app";

jest.mock('../src/services/userService');

describe('userController Test Suite', ()=>{
    test('getAllusers should return an array of users.',async ()=>{
        let response = await request(app).get('/users');
        expect(response.statusCode).toBe(200);
        let users = response.body;
        expect(users.length).toBeGreaterThan(0);
        expect(users[0]._id).toBe('1');
    });
})