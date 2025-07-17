const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// POST /api/projects
router.post('/', projectController.createProject);

// GET /api/projects/company/:companyId
router.get('/company/:companyId', projectController.getProjectsByCompany);

// GET /api/projects/:id
router.get('/:id', projectController.getProjectById);

// PUT /api/projects/:id
router.put('/:id', projectController.updateProject);

// DELETE /api/projects/:id
router.delete('/:id', projectController.deleteProject);

module.exports = router;
