const chai = require('chai');
const chaiHttp = require('chai-http');
const shell = require('shelljs');
const server = require('../../../src/api');
const sequelizeCLI = require('../../helpers/sequelizeCLI');
const categoryMock = require('../../mocks/categories');
const { correctBodyOfLoginRequest } = require('../../mocks/users');

chai.use(chaiHttp);
const { expect } = chai;

describe('Testes da rota POST /categories', () => {
  let response;

  before(() => {
    shell.exec(sequelizeCLI.drop);
    shell.exec(sequelizeCLI.create);
    shell.exec(sequelizeCLI.migrate);
    shell.exec(sequelizeCLI.seed);
  });

  describe('Será validado que não é possível cadastrar uma categoria sem o token', () => {

    before(async () => {
      response = await chai.request(server).post('/categories');
    });

    it('Deve responder com código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('Deve retornar a mensagem de erro "Token not found" no corpo da response', () => {
      const errorMessage = { message: 'Token not found' };

      expect(response.body).to.be.eqls(errorMessage);
    });
  });

  describe('Será validado que não é possível cadastrar uma categoria com o token inválido', () => {

    before(async () => {
      response = await chai
        .request(server)
        .post('/categories')
        .set(categoryMock.invalidToken);
    });

    it('Deve responder com código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('Deve retornar a mensagem de erro "Expired or invalid token" no corpo da response', () => {
      const errorMessage = { message: 'Expired or invalid token' };

      expect(response.body).to.be.eqls(errorMessage);
    });
  });

  describe('Será validado que não é possivel cadastrar uma categoria sem o campo name', () => {

    before(async () => {
      const loginRespose = await chai
        .request(server)
        .post('/login')
        .send(correctBodyOfLoginRequest);

      response = await chai
      .request(server)
      .post('/categories')
      .set({ authorization: loginRespose.body.token });
    });

    it('Deve responder com código de status "400"', () => {
      expect(response).to.have.status(400);
    });

    it('Deve retornar a mensagem de erro ""name" is required" no corpo da response', () => {
      const errorMessage = { message: '"name" is required' };

      expect(response.body).to.be.eqls(errorMessage);
    });
  });

  describe('Será validado que é possivel cadastrar uma categoria com sucesso', () => {

    before(async () => {
      const loginRespose = await chai
        .request(server)
        .post('/login')
        .send(correctBodyOfLoginRequest);

      response = await chai
      .request(server)
      .post('/categories')
      .set({ authorization: loginRespose.body.token })
      .send(categoryMock.correctCategoryReqBody);
    });

    it('Deve responder com código de status "201"', () => {
      expect(response).to.have.status(201);
    });

    it('Deve retornar a categoria criada no corpo da response', () => {
      expect(response.body).to.have.property('id', 3);
      expect(response.body).to.have.property('name', categoryMock.correctCategoryReqBody.name);
    });
  });
})