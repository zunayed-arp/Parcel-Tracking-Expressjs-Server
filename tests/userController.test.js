import request from "supertest";
import app from "../src/app";

jest.mock("../src/services/userService");

describe("userController Test Suite", () => {
  test("get should return an array of users.", async () => {
    let response = await request(app).get("/users");
    expect(response.statusCode).toBe(200);
    let users = response.body;
    expect(users.length).toBeGreaterThan(0);
    expect(users[0].id).toBe("1");
  });
  test("post should return saved id", async () => {
    let user = { username: "test002" };
    let response = await request(app).post("/users").send(user);

    expect(response.statusCode).toBe(201);
    let body = response.body;
    console.log("body", body);
    expect(body.length).toBe(24);
    // 63d79bf6f8f543f51bba5655
    let savedUserResponse = await request(app).get("/users/" + body);
    // console.log('saved user response',savedUserResponse)
    let savedUser = savedUserResponse.body;
    // console.log('saved user',savedUser)
    expect(savedUser.createdAt).not.toBe(null);
    expect(savedUser.username).toBe(user.username);
  });

  test("get by id should return an user", async () => {
    let savedUserResponse = await request(app).get("/users/1");
    let user = savedUserResponse.body;
    expect(user.id).toBe("1");
  });

  test("put should update an existing user", async () => {
    let user = { id: "1", username: "test003" };
    let response = await request(app).put("/users").send(user);
    expect(response.statusCode).toBe(200);
    let updatetedResponse = await request(app).get("/users/1");
    let updatedUser = updatetedResponse.body;
    expect(updatedUser.username).toBe(user.username);
  });

  test.only("delete by id should return success message", async () => {
    let response = await request(app).delete("/users/1");
    expect(response.statusCode).toBe(200);
    let deletedUserResponse = await request(app).get("/users/1");
    expect(deletedUserResponse.statusCode).toBe(404);
    let deletedUser = deletedUserResponse.body;
    // console.log('deleted response',deletedUser.message)
    expect(deletedUser.message).toBe("User not found by the id: 1");
  });
});
