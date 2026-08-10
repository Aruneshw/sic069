import { prisma } from './src/lib/prisma';

async function main() {
  try {
    const res = await prisma.contactMessage.create({
      data: {
        name: 'Test',
        email: 'test@example.com',
        subject: 'Test',
        message: 'Test message',
      }
    });
    console.log('Success:', res);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
