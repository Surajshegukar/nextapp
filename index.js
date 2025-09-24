const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const prisma = require('./config/prisma.js'); // Prisma client

// API routes
const departmentRoutes = require('./routes/department_routes');
const commonRoutes = require('./routes/common_routes');
const authRoutes = require('./routes/auth_routes');
const categoryRoutes = require('./routes/category_routes');
const magazineRoutes = require('./routes/magazine_routes');

// Load environment variables
dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development',
});

const dev = process.env.NODE_ENV !== 'production';
const app = express();

console.log('Starting server...');

// Attach Prisma to requests
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Static folder for uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// API routes
app.use('/api', commonRoutes);
app.use('/api/department', departmentRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/magazine',magazineRoutes);
// app.use('/api/auth', authRoutes);

if (!dev) {
  // Serve static files from the React app in production
  app.use(express.static(path.join(__dirname, 'apps/website/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'apps/website/build', 'index.html'));
  });
 
  app.use('/admin', express.static(path.join(__dirname, 'apps/admin/build')));
  app.get('/admin/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'apps/admin/build', 'index.html'));
  });
}

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT || 5000}`
  );
});
