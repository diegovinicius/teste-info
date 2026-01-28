const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');
const sequelize = require('../src/config/database');

describe('CRUD Veículos - SQLite', () => {

  before(async () => {
    await sequelize.sync({ force: true });
  });

  let id;

  it('Cria veículo', async () => {
    const res = await request(app).post('/api/veiculos').send({
      placa:'ABC-1234',
      chassi:'CHASSI123',
      renavam:'RENAVAM123',
      modelo:'Civic',
      marca:'Honda',
      ano:2021
    });
    expect(res.status).to.equal(201);
    id = res.body.id;
  });

  it('Lista veículos', async () => {
    const res = await request(app).get('/api/veiculos');
    expect(res.body).to.be.an('array');
  });

  it('Busca por ID', async () => {
    const res = await request(app).get(`/api/veiculos/${id}`);
    expect(res.status).to.equal(200);
  });

  it('Atualiza veículo', async () => {
    const res = await request(app)
      .put(`/api/veiculos/${id}`)
      .send({ modelo: 'Civic Touring' });
    expect(res.body.modelo).to.equal('Civic Touring');
  });

  it('Remove veículo', async () => {
    const res = await request(app).delete(`/api/veiculos/${id}`);
    expect(res.status).to.equal(204);
  });

});