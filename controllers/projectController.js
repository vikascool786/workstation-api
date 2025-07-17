const { Project, Company } = require('../models');

// Create a project under a company
exports.createProject = async (req, res) => {
  const { name, description, companyId } = req.body;

  try {
    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const project = await Project.create({ name, description, companyId });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all projects for a company
exports.getProjectsByCompany = async (req, res) => {
  const { companyId } = req.params;

  try {
    const projects = await Project.findAll({ where: { companyId } });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single project
exports.getProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findByPk(id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const project = await Project.findByPk(id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    project.name = name ?? project.name;
    project.description = description ?? project.description;
    await project.save();

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findByPk(id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    await project.destroy();
    res.json({ msg: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
