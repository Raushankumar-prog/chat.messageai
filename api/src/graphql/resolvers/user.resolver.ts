import prisma from "../../server.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key"; 

export const userResolvers = {
  Query: {
    users: () => prisma.user.findMany(),
    user: (_: any, args: { id: string }) => prisma.user.findUnique({ where: { id: args.id } }),
  },

  Mutation: {
    createUser: async (_: any, args: { email: string; name?: string; avatar?: string; password?: string; googleId?: string }) => {
      const existingUser = await prisma.user.findUnique({ where: { email: args.email } });
      if (existingUser) {
        throw new Error("User already exists with this email");
      }

      const hashedPassword = args.password ? await bcrypt.hash(args.password, 10) : null;

      return prisma.user.create({
        data: {
          email: args.email,
          name: args.name ?? null,
          avatar: args.avatar ?? null,
          password: hashedPassword ?? null,
          googleId: args.googleId ?? null,
        },
      });
    },

    loginUser: async (_: any, args: { email: string; password?: string; googleId?: string }) => {
      const user = await prisma.user.findUnique({ where: { email: args.email } });

      if (!user) {
        throw new Error("User not found");
      }

      if (!user.email) {
        throw new Error("User email is missing in the database");
      } 

      if (args.googleId) {
        if (user.googleId !== args.googleId) {
          throw new Error("Invalid Google ID");
        }
      } else if (args.password) {
        if (!user.password) {
          throw new Error("This account does not support password login");
        }
        const isPasswordValid = await bcrypt.compare(args.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }
      } else {
        throw new Error("Either password or Google ID is required for login");
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

      return { token, user };
    },

    updateUser: async (_: any, args: { id: string; name?: string; email?: string; avatar?: string }) => {
      const existingUser = await prisma.user.findUnique({ where: { id: args.id } });
      if (!existingUser) {
        throw new Error("User not found");
      }

      // Check if email is unique if being updated
      if (args.email && args.email !== existingUser.email) {
        const emailTaken = await prisma.user.findUnique({ where: { email: args.email } });
        if (emailTaken) {
          throw new Error("Email already in use by another user");
        }
      }

      return prisma.user.update({
        where: { id: args.id },
        data: {
          name: args.name ?? existingUser.name,
          email: args.email ?? existingUser.email,
          avatar: args.avatar ?? existingUser.avatar,
        },
      }); 
    }, 
  }, 
};
