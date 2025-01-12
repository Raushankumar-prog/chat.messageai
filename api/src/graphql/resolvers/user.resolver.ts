import prisma from "../../server.js";

export const userResolvers = {
  Query: {
    users: () => prisma.user.findMany(),
    user: (_: any, args: { id: string }) => prisma.user.findUnique({ where: { id: args.id } }),
  },

  Mutation: {
    createUser: (_: any, args: { email: string; name?: string; avatar?: string }) =>
      prisma.user.create({
        data: {
          email: args.email,
          name: args.name ?? null, 
          avatar: args.avatar ?? null, 
        },
      }),
  },
  
};
