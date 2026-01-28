const Veiculo = require('../models/Veiculo');

exports.create = async (req, res) => res.status(201).json(await Veiculo.create(req.body));
exports.findAll = async (req, res) => res.json(await Veiculo.findAll());
exports.findById = async (req, res) => {
  const v = await Veiculo.findByPk(req.params.id);
  v ? res.json(v) : res.status(404).json({ error: 'Não encontrado' });
};
exports.update = async (req, res) => {
  const v = await Veiculo.findByPk(req.params.id);
  v ? res.json(await v.update(req.body)) : res.status(404).json({ error: 'Não encontrado' });
};
exports.delete = async (req, res) => {
  const v = await Veiculo.findByPk(req.params.id);
  v ? (await v.destroy(), res.status(204).end()) : res.status(404).json({ error: 'Não encontrado' });
};