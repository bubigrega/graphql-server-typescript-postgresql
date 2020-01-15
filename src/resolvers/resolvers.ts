import * as bcrypt from "bcrypt";
import { User } from "../entity/User";
import { ResolverMap } from "../types/graphql-utils";

export const resolvers: ResolverMap = {
  Query: {
    hello: (_, { name }: GQL.IHelloOnQueryArguments) => `Bye ${name || "World"}`
    // users: async () => {
    //   const users = await User.find();
    //   return users.forEach(u => u.email);
    // }
  },
  Mutation: {
    register: async (
      _,
      { email, password }: GQL.IRegisterOnMutationArguments
    ) => {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = User.create({ email, password: hashedPassword });
      await User.save(user);

      return true;
    }
  }
};
