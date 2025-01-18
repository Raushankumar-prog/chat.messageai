import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      name: 'John Doe',
      avatar: 'https://example.com/avatar.jpg',
    },
  });

  // Create 10 chats for the user
  for (let i = 1; i <= 10; i++) {
    const chat = await prisma.chat.create({
      data: {
        userId: user.id,
        title: `Chat ${i}`,
      },
    });

    console.log(`Created Chat: ${chat.title}`);

    // Add 5 messages per chat (user asks, AI replies)
    for (let j = 1; j <= 5; j++) {
      // User question (parent message)
      const userMessage = await prisma.message.create({
        data: {
          chatId: chat.id,
          content: `User's question ${j} in Chat ${i}: What is the answer to question ${j}?`,
          role: 'USER',
        },
      });

      // AI reply (child message)
      const aiMessage = await prisma.message.create({
        data: {
          chatId: chat.id,
          content: `AI's reply ${j} in Chat ${i}: The answer to question ${j} is simple.`,
          role: 'SYSTEM',
          parentMessageId: userMessage.id,
        },
      });

      console.log(`Added Message ${j} in Chat ${i}: User -> AI`);
    }
  }

  console.log('Seeding completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error seeding data:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
