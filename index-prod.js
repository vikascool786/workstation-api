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

const app = express();
app.use(cors());
app.use(express.json());

app.use('/workstation-api/api/auth', authRoutes);
app.use('/workstation-api/api/users', userRoutes);
app.use('/workstation-api/api/boards', boardRoutes);
app.use('/workstation-api/api/boards', columnRoutes); // columns nested under boards
app.use('/workstation-api/api/columns', taskRoutes);  // tasks nested under columns
app.use('/workstation-api/api/tasks', taskRoutes);    // for task actions like move/delete
app.use('/workstation-api/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.APP_PORT || 5001;

sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('DB connection error', err));

