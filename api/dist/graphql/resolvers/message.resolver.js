import prisma from "../../server.js";
export const messageResolvers = {
    Query: {
        // Fetch all messages for a specific chat
        messages: async (_, args) => {
            return await prisma.message.findMany({
                where: { chatId: args.chatId },
                include: {
                    chat: true,
                    mediaLinks: true,
                    parentMessage: true,
                    childMessages: true,
                },
            });
        },
        // Fetch a single message by ID
        message: async (_, args) => {
            return await prisma.message.findUnique({
                where: { id: args.id },
                include: {
                    chat: true,
                    mediaLinks: true,
                    parentMessage: true,
                    childMessages: true,
                },
            });
        },
    },
    Mutation: {
        // Create a new message
        createMessage: async (_, args) => {
            return await prisma.message.create({
                data: {
                    content: args.content,
                    role: args.role,
                    chatId: args.chatId,
                    parentMessageId: args.parentMessageId || null,
                    mediaLinks: args.mediaLinks
                        ? {
                            create: args.mediaLinks.map((mediaLink) => ({
                                url: mediaLink.url,
                                type: mediaLink.type,
                            })),
                        }
                        : undefined,
                },
                include: {
                    chat: true,
                    mediaLinks: true,
                    parentMessage: true,
                    childMessages: true,
                },
            });
        },
        // Update an existing message
        updateMessage: async (_, args) => {
            return await prisma.message.update({
                where: { id: args.id },
                data: {
                    content: args.content || undefined,
                    role: args.role || undefined,
                },
                include: {
                    chat: true,
                    mediaLinks: true,
                    parentMessage: true,
                    childMessages: true,
                },
            });
        },
        // Delete a message
        deleteMessage: async (_, args) => {
            return await prisma.message.delete({
                where: { id: args.id },
            });
        },
    },
};
