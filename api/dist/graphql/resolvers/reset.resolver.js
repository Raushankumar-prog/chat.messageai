import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import prisma from "../../server.js";
import dotenv from "dotenv";
dotenv.config();
const verificationCodes = {};
export const resetresolvers = {
    Mutation: {
        sendResetCode: async (_, { email }) => {
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            verificationCodes[email] = { code, timestamp: Date.now() };
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
                text: `Your verification code is: ${code}. It is valid for 3 minutes.`,
            });
            return true;
        },
        verifyResetCode: (_, { email, code }) => {
            const entry = verificationCodes[email];
            if (!entry)
                return false;
            const { code: storedCode, timestamp } = entry;
            if (storedCode === code && Date.now() - timestamp <= 180000) {
                delete verificationCodes[email];
                return true;
            }
            return false;
        },
        resetPassword: async (_, { email, newPassword }) => {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await prisma.User.update({
                where: { email },
                data: { password: hashedPassword },
            });
            return true;
        },
    },
};
