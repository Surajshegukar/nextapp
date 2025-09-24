const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  prisma.$on('query', (e) => {
    console.log('Query:', e.query);
  });
}

module.exports = prisma;
