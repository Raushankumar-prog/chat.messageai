import prisma from "../../server.js";

export const messageResolvers = {
  Query: {
    // Fetch all messages for a specific chat
    messages: async (_: any, args: { chatId: string }) => {
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
    message: async (_: any, args: { id: string }) => {
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
    createMessage: async (
      _: any,
      args: {
        content: string;
        role: string;
        chatId: string;
        parentMessageId?: string;
        mediaLinks?: { url: string }[];
      }
    ) => {
      return await prisma.message.create({
        data: {
          content: args.content,
          role: args.role,
          chatId: args.chatId,
          parentMessageId: args.parentMessageId || null,
          mediaLinks: args.mediaLinks
            ? {
                create: args.mediaLinks,
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
    updateMessage: async (
      _: any,
      args: { id: string; content?: string; role?: string }
    ) => {
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
    deleteMessage: async (_: any, args: { id: string }) => {
      return await prisma.message.delete({
        where: { id: args.id },
      });
    },
  },
};
