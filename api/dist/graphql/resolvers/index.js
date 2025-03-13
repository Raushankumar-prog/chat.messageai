import { chatResolvers } from "./chat.resolver.js";
import { messageResolvers } from "./message.resolver.js";
import { userResolvers } from "./user.resolver.js";
import { askairesolvers } from "../../ai/gemini/textgeneration.js";
import { resetresolvers } from "./reset.resolver.js";
import { aiResponseSubscription } from "../../schema.js";
import getOpenai from "../../ai/openai/textGenerate.js";
import { GraphQLString } from 'graphql';
export const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...messageResolvers.Query,
        ...chatResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...messageResolvers.Mutation,
        ...chatResolvers.Mutation,
        ...askairesolvers.Mutation,
        ...resetresolvers.Mutation
    },
    Subscription: {
        aiResponse: {
            type: GraphQLString,
            args: {
                message: { type: GraphQLString },
                chatId: { type: GraphQLString },
            },
            subscribe: aiResponseSubscription,
        },
        openairesponse: {
            type: GraphQLString,
            args: {
                message: { type: GraphQLString },
                chatId: { type: GraphQLString },
            },
            subscribe: getOpenai,
        },
        deepsakeresponse: {
            type: GraphQLString,
            args: {
                message: { type: GraphQLString },
                chatId: { type: GraphQLString },
            },
            subscribe: getOpenai,
        },
    },
};
