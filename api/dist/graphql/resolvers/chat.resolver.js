import prisma from "../../server.js";
export const chatResolvers = {
    Query: {
        chats: async (_, args) => {
            return await prisma.chat.findMany({
                where: { userId: args.userId },
                include: {
                    user: true,
                    messages: true,
                },
            });
        },
        chatone: async (_, args) => {
            return await prisma.chat.findUnique({
                where: { id: args.id },
                include: {
                    user: true,
                    messages: true,
                },
            });
        },
    },
    Mutation: {
        createChat: async (_, args) => {
            return await prisma.chat.create({
                data: {
                    title: args.title || null,
                    userId: args.userId,
                },
            });
        },
        updateChat: async (_, args) => {
            return await prisma.chat.update({
                where: { id: args.id },
                data: {
                    title: args.title || null,
                },
            });
        },
        deleteChat: async (_, args) => {
            return await prisma.chat.delete({
                where: { id: args.id },
            });
        },
    },
};
