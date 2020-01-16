import { request } from "graphql-request";
import { User } from "../entity/User";
import { startServer } from "../utils/startServer";

const email = "boby2@test.si";
const password = "test";

const query = `
mutation {
  register(email: "${email}", password: "${password}")
}
`;

let getHost = () => "";

beforeAll(async () => {
  const app = await startServer();
  const { port }: any = app.address();
  console.log(port);
  getHost = () => `http://127.0.0.1:${port}`;
});

describe("resolver block", () => {
  test("should register new user", async () => {
    const response = await request(getHost(), query);

    expect(response).toEqual({ register: true });
  }, 1000);

  it("should find user in database", async () => {
    const users = await User.find({ where: { email } });
    const user = users[0];

    expect(users).toHaveLength(1);
    expect(user.email).toBe(email);
    expect(user.password).not.toBe(password);
  }, 1000);
});
