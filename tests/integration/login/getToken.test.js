const chai = require('chai');
const chaiHttp = require('chai-http');
const shell = require('shelljs');
const sequelizeCommands = require('../../helpers/sequelizeCommands');
const server = require('../../../src/api');

chai.use(chaiHttp);

const { expect } = chai;

const usersMock = require('../../mocks/users');
const { validateToken } = require('../../helpers/validateToken');

describe('Testes da rota POST /login', () => {

  before(() => {
    shell.exec(sequelizeCommands.drop);
    shell.exec(sequelizeCommands.create);
    shell.exec(sequelizeCommands.migrate);
    shell.exec(sequelizeCommands.seed);
  });

  let response;

  describe('Será validado que não é possível fazer login sem todos os campos preenchidos', () => {

    before(async () => {
      response = await chai.request(server).post('/login');
    });

    it('Deve responder com um código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Deve responder com a mensagem de erro "Some required fields are missing"', () => {
      const messageError = { message: 'Some required fields are missing' };

      expect(response.body).to.be.eqls(messageError);
    });
  });

  describe('Será validado que não é possível fazer login com um usuário que não existe', () => {

    before(async () => {
      response = await chai.request(server).post('/login').send(usersMock.incorrectBodyOfLoginRequest);
    });

    it('Deve responder com um código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Deve responder com a mensagem de erro "Invalid fields"', () => {
      const messageError = { message: 'Invalid fields' };

      expect(response.body).to.be.eqls(messageError);
    });
  });
  
  describe('Será validado que é possível fazer login com sucesso', () => {

    before(async () => {
      response = await chai.request(server).post('/login').send(usersMock.correctBodyOfLoginRequest);
    });

    it('Deve responder com um código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Deve responder com um token', () => {
      const checkToken = validateToken(response.body.token);

      expect(checkToken).to.have.property('id');
      expect(checkToken).to.have.property('displayName');
      expect(checkToken).to.have.property('email');
      expect(checkToken).to.have.property('image');
      expect(checkToken).not.to.have.property('password');
    });
  });
});