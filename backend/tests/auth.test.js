const request = require("supertest");

const app = require("../src/server");

describe("Auth API", () => {

  it("should login user", async () => {

    const response =
      await request(app)
        .post("/auth/login")
        .send({
          email: "test@test.com",
          password: "123456"
        });

    expect(response.statusCode)
      .toBe(200);

    expect(response.body.token)
      .toBeDefined();

  });

  it(
    "should get tasks with token",
    async () => {

      const loginResponse =
        await request(app)
          .post("/auth/login")
          .send({
            email: "test@test.com",
            password: "123456"
          });

      const token =
        loginResponse.body.token;

      const response =
        await request(app)
          .get("/tasks")
          .set(
            "Authorization",
            `Bearer ${token}`
          );

      expect(response.statusCode)
        .toBe(200);

      expect(
        Array.isArray(response.body)
      ).toBe(true);

    }
  );

  it(
  "should create task with token",
  async () => {

    const loginResponse =
      await request(app)
        .post("/auth/login")
        .send({
          email: "test@test.com",
          password: "123456"
        });

    const token =
      loginResponse.body.token;

    const response =
      await request(app)
        .post("/tasks")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          title: "Test task"
        });

    expect(response.statusCode)
      .toBe(201);

    expect(response.body.title)
      .toBe("Test task");

  }
);

it(
  "should reject request without token",
  async () => {

    const response =
      await request(app)
        .get("/tasks");

    expect(response.statusCode)
      .toBe(401);

  }
);

it(
  "should update task",
  async () => {

    const loginResponse =
      await request(app)
        .post("/auth/login")
        .send({
          email: "test@test.com",
          password: "123456"
        });

    const token =
      loginResponse.body.token;

    const createdTask =
      await request(app)
        .post("/tasks")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          title: "Task to update"
        });

    const response =
      await request(app)
        .put(
          `/tasks/${createdTask.body.id}`
        )
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          completed: true
        });

    expect(response.statusCode)
      .toBe(200);

    expect(response.body.completed)
      .toBe(true);

  }
);it(
  "should update task",
  async () => {

    const loginResponse =
      await request(app)
        .post("/auth/login")
        .send({
          email: "test@test.com",
          password: "123456"
        });

    const token =
      loginResponse.body.token;

    const createdTask =
      await request(app)
        .post("/tasks")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          title: "Task to update"
        });

    const response =
      await request(app)
        .put(
          `/tasks/${createdTask.body.id}`
        )
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          completed: true
        });

    expect(response.statusCode)
      .toBe(200);

    expect(response.body.completed)
      .toBe(true);

  }
);

it(
  "should delete task",
  async () => {

    const loginResponse =
      await request(app)
        .post("/auth/login")
        .send({
          email: "test@test.com",
          password: "123456"
        });

    const token =
      loginResponse.body.token;

    const createdTask =
      await request(app)
        .post("/tasks")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          title: "Task to delete"
        });

    const response =
      await request(app)
        .delete(
          `/tasks/${createdTask.body.id}`
        )
        .set(
          "Authorization",
          `Bearer ${token}`
        );

    expect(response.statusCode)
      .toBe(200);

  }
);

});

