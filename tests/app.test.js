import request from "supertest";
import app from "../src/app";


import {getAllUsers} from "../src/services/userService";
jest.mock('../src/services/userService');

beforeAll(async ()=>{
    console.log('before all');
});

afterAll(async ()=>{
    console.log('after all');
});


beforeEach(async ()=>{
    console.log("before each")
});

afterEach(async ()=>{
    console.log("After Each")
});

describe("user controller test suite", () => {
  test("should work", async () => {
    console.log("my first test");
  });
  
});