import prisma from "../../server.js";

export const chatResolvers = {
  Query: {

    chats: async (_: any, args: { userId: string }) => {
      return await prisma.chat.findMany({
        where: { userId: args.userId },
        include: {
          user: true,
          messages: true,
        },
      });
    },

 
    chatone: async (_: any, args: { id: string }) => {
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
  
    createChat: async (_: any, args: { title?: string; userId: string }) => {
      return await prisma.chat.create({
        data: {
          title: args.title || null,
          userId: args.userId,
        },
      });
    },

    
    updateChat: async (_: any, args: { id: string; title?: string }) => {
      return await prisma.chat.update({
        where: { id: args.id },
        data: {
          title: args.title || null,
        },
      });
    },


    deleteChat: async (_: any, args: { id: string }) => {
      return await prisma.chat.delete({
        where: { id: args.id },
      });
    },
  },

 
};
