import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma, APP_SECRET, getUserIdFromAuthHeader } from "./context";

export const resolvers = {
  Query: {
    me: async (_: any, __: any, context: any) => {
      const userId = getUserIdFromAuthHeader(context.req.headers.authorization);

      if (!userId) throw new Error("Not Authenticated");

      return await prisma.user.findUnique({ where: { id: userId } });
    },
  },

  Mutation: {
    signup: async (_: any, args: any) => {
      const password = await bcrypt.hash(args.password, 10);
      const user = await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password,
        },
      });

      const token = jwt.sign({ userId: user.id }, APP_SECRET);
      return { token, user };
    },

    login: async (_: any, args: any) => {
      const user = await prisma.user.findUnique({
        where: { email: args.email },
      });
      if (!user) throw new Error("No user found");

      const valid = await bcrypt.compare(args.password, user.password);
      if (!valid) throw new Error("Invalid password");

      const token = jwt.sign({ userId: user.id }, APP_SECRET);
      return { token, user };
    },
  },
};
