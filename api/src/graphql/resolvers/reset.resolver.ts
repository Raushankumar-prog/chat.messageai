
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import prisma from "../../server.js";
import dotenv from "dotenv";
dotenv.config();


const verificationCodes = {}; 
const users = {}; 

export const resetresolvers = {
  Mutation: {
    sendResetCode: async (_, { email }) => {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      verificationCodes[email] = code;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your Password Reset Code",
        text: `Your verification code is: ${code}`,
      });

      return true;
    },

    verifyResetCode: (_, { email, code }) => {
      if (verificationCodes[email] === code) {
        delete verificationCodes[email]; // Remove code after verification
        return true;
      }
      return false;
    },

   resetPassword: async (_: any, { email, newPassword }: { email: string; newPassword: string }) => {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await prisma.User.update({
        where: { email },
        data: { password: hashedPassword },
      });
      return true;
    },
  },
};