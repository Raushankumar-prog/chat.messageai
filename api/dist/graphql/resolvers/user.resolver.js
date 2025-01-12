import prisma from "../../server.js";
export const userResolvers = {
    Query: {
        users: () => prisma.user.findMany(),
        user: (_, args) => prisma.user.findUnique({ where: { id: args.id } }),
    },
    Mutation: {
        createUser: (_, args) => prisma.user.create({
            data: {
                email: args.email,
                name: args.name ?? null,
                avatar: args.avatar ?? null,
            },
        }),
    },
};
