const chai = require('chai');
const chaiHttp = require('chai-http');
const shell = require('shelljs');
const server = require('../../../src/api');
const sequelizeCLI = require('../../helpers/sequelizeCLI');
const usersMock = require('../../mocks/users');

chai.use(chaiHttp);
const { expect } = chai;

describe('Testes da rota GET /user/:id', () => {
  let response;

  before(() => {
    shell.exec(sequelizeCLI.drop);
    shell.exec(sequelizeCLI.create);
    shell.exec(sequelizeCLI.migrate);
    shell.exec(sequelizeCLI.seed);
  });

  describe('Será validado que não é possível listar um determinado usuário sem o token na requisição', () => {

    before(async () => {
      response = await chai.request(server).get('/user/1');
    });

    it('Deve responder com código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('Deve retornar a mensagem de erro "Token not found" no corpo da response', () => {
      const errorMessage = { message: 'Token not found' };

      expect(response.body).to.be.eqls(errorMessage);
    });
  });

  describe('Será validado que não é possível listar um determinado usuário com o token inválido', () => {

    before(async () => {
      response = await chai.request(server).get('/user/1').set(usersMock.invalidToken);
    });

    it('Deve responder com código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('Deve retornar a mensagem de erro "Expired or invalid token" no corpo da response', () => {
      const errorMessage = { message: 'Expired or invalid token' };

      expect(response.body).to.be.eqls(errorMessage);
    });
  });

  describe('Será validado que não é possível listar um usuário inexistente', () => {

    before(async () => {
      const loginRespose = await chai.request(server).post('/login').send(usersMock.correctBodyOfLoginRequest);
      
      response = await chai.request(server).get('/user/9999').set({ authorization: loginRespose.body.token });
    });

    it('Deve responder com código de status "404"', () => {
      expect(response).to.have.status(404);
    });

    it('Deve retornar a mensagem de erro "User does not exist" no corpo da response', () => {
      const errorMessage = { message: 'User does not exist' };

      expect(response.body).to.be.eqls(errorMessage);
    });
  });

  describe('Será validado que é possível listar um usuário específico com sucesso', () => {

    before(async () => {
      const loginRespose = await chai.request(server).post('/login').send(usersMock.correctBodyOfLoginRequest);
      
      response = await chai.request(server).get('/user/1').set({ authorization: loginRespose.body.token });
    });

    it('Deve responder com código de status "200"', () => {
      expect(response).to.have.status(200);
    });

    it('Deve retornar um usuário específico no corpo da response', () => {
      expect(response.body).to.be.eqls(usersMock.allUsers[0]);
    });
  });
});