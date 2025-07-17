require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const authRoutes = require('./routes/auth');
const boardRoutes = require('./routes/boards');
const columnRoutes = require('./routes/columns');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');
const { specs, swaggerUi } = require('./swagger');
const companyRoutes = require('./routes/companies');
const projectRoutes = require('./routes/projects');

const app = express();
app.use(cors());
app.use(express.json());

// Auth and User Management
app.use('/workstation-api/api/auth', authRoutes);
app.use('/workstation-api/api/users', userRoutes); // Admin can list, assign roles etc.

// Board & Column Management
app.use('/workstation-api/api/boards', boardRoutes);  // /workstation-api/api/boards/*
app.use('/workstation-api/api/boards', columnRoutes); // /workstation-api/api/boards/:id/columns

// Task Management
app.use('/workstation-api/api/columns', taskRoutes);  // /workstation-api/api/columns/:id/tasks
app.use('/workstation-api/api/tasks', taskRoutes);    // /workstation-api/api/tasks/:id actions

//company Management
app.use('/workstation-api/api/companies', companyRoutes);


//Project Management
app.use('/workstation-api/api', projectRoutes);

// Swagger Docs
app.use('/workstation-api/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('DB connection error', err));
