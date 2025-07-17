const { Company, User, Project } = require('../models');

// Create company
exports.createCompany = async (req, res) => {
  const { name } = req.body;

  try {
    const company = await Company.create({ name });
    res.status(201).json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get company by ID (with optional includes)
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id, {
      include: [User, Project] // or Board
    });

    if (!company) return res.status(404).json({ error: 'Company not found' });
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update company
exports.updateCompany = async (req, res) => {
  const { name } = req.body;

  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) return res.status(404).json({ error: 'Company not found' });

    company.name = name ?? company.name;
    await company.save();

    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete company
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) return res.status(404).json({ error: 'Company not found' });

    await company.destroy();
    res.json({ msg: 'Company deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
