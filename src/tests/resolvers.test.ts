import { request } from "graphql-request";
import { createConnection } from "typeorm";
import { User } from "../entity/User";
// import { startServer } from "..";

const add = (a: number, b: number): number => a + b;

const email = "boby2@test.si";
const password = "test";

const query = `
mutation {
  register(email: "${email}", password: "${password}")
}
`;

// beforeAll(() => {
//   return startServer();
// });

describe("resolver block", () => {
  test("add 3 + 5 to be 8", () => {
    expect(add(3, 5)).toBe(8);
  });

  test("registering new user", async () => {
    const response = await request("http://localhost:4000", query);

    expect(response).toEqual({ register: true });
  });

  test("same data in db after registering", async done => {
    await createConnection();

    const users = await User.find({ where: { email } });
    const user = users[0];

    expect(users).toHaveLength(1);
    expect(user.email).toBe(email);
    expect(user.password).not.toBe(password);
    done;
  });
});
