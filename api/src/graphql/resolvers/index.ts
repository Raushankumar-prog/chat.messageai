import { chatResolvers } from "./chat.resolver.js";
import { messageResolvers } from "./message.resolver.js";
import { userResolvers } from "./user.resolver.js";
import { askairesolvers } from "../../ai/gemini/textgeneration.js";
import { resetresolvers } from "./reset.resolver.js";
import { aiResponseSubscription } from "../../schema.js";
import getOpenai from "../../ai/openai/textGenerate.js";
import {  GraphQLString } from 'graphql';
import getGrokai from "../../ai/grok/grok.js";
import { getClaudeResponse } from "../../ai/claude/textgeneration.js";



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
               model: { type: GraphQLString }
            },
            subscribe: aiResponseSubscription,
          },
          openairesponse: {
            type: GraphQLString,
            args: {
              message: { type: GraphQLString },
              chatId: { type: GraphQLString },
              model: { type: GraphQLString }
            },
            subscribe:getOpenai,
          },

      grokresponse: {
      type: GraphQLString,
      args: {
        message: { type: GraphQLString },
        chatId: { type: GraphQLString },
        model: { type: GraphQLString }
      },
      subscribe: getGrokai,
    },
     clauderesponse: {
      type: GraphQLString,
      args: {
        message: { type: GraphQLString },
        chatId: { type: GraphQLString },
        model: { type: GraphQLString }
      },
      subscribe: getClaudeResponse,
    }
          

  },
};
