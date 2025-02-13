import prisma from "../../server.js";
import { MediaType, UserRole } from "@prisma/client";

export const messageResolvers = {
  Query: {
    // Fetch all messages for a specific chat
    messages: async (_: any, args: { chatId: string }) => {
  return await prisma.message.findMany({
    where: {
      chatId: args.chatId,
      role: "USER",
    },
    include: {
      chat: true,
      mediaLinks: true,
      parentMessage: true,
      childMessages: true,
    },
    orderBy: {
      createdAt: "asc",
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
        role: UserRole;
        chatId: string;
        childMessage?: { content: string; role: UserRole, chatId:string};
        mediaLinks?: { url: string; type: MediaType }[];
      }
    ) => {
      return await prisma.message.create({
        data: {
          content: args.content,
          role: args.role,
          chat: { connect: { id: args.chatId } },
          childMessages: args.childMessage
            ? {
                create: [
                  {
                    content: args.childMessage.content,
                    role: args.childMessage.role,
                    chat: { connect: { id: args.chatId } }, // Ensure child message is linked properly
                  },
                ],
              }
            : undefined,
          mediaLinks: args.mediaLinks?.length
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
          childMessages: true,
        },
      });
    }, // **Fixed: Added a comma here**

    // Update an existing message
    updateMessage: async (
      _: any,
      args: { id: string; content?: string; role?: UserRole }
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
