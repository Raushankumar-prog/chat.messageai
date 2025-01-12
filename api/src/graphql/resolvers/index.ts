import { chatResolvers } from "./chat.resolver.js";
import { messageResolvers } from "./message.resolver.js";
import { userResolvers } from "./user.resolver.js";

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...messageResolvers.Query,
    ...chatResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...messageResolvers.Mutation,
    ...chatResolvers.Mutation
  },
};
