const chai = require('chai');
const chaiHttp = require('chai-http');
const shell = require('shelljs');
const sequelizeCommands = require('../../helpers/sequelizeCommands');
const server = require('../../../src/api');
const usersMock = require('../../mocks/users');
const { validateToken } = require('../../helpers/validateToken');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota POST /user', () => {

  before(() => {
    shell.exec(sequelizeCommands.drop);
    shell.exec(sequelizeCommands.create);
    shell.exec(sequelizeCommands.migrate);
    shell.exec(sequelizeCommands.seed);
  })

  let response;

  describe('Será validado que não é possível cadastrar com o campo "displayName" menor que 8 caracteres', () => {

    before(async () => {
      response = await chai.request(server).post('/user').send(usersMock.incorrectDisplayNameUserReqBody);
    })

    it('Deve responder com código de status "400"', () => {
      expect(response).to.have.status(400);
    });

    it('Deve retornar a mensagem de erro ""displayName" length must be at least 8 characters long" no corpo da response', () => {
      const errorMessage = { message: '"displayName" length must be at least 8 characters long' }

      expect(response.body).to.be.eqls(errorMessage);
    });
  });

  describe('Será validado que não é possível cadastrar com o campo "email" com formato inválido', () => {

    before(async () => {
      response = await chai.request(server).post('/user').send(usersMock.incorrectEmailUserReqBody);
    })

    it('Deve responder com código de status "400"', () => {
      expect(response).to.have.status(400);
    });

    it('Deve retornar a mensagem de erro ""email" must be a valid email" no corpo da response', () => {
      const errorMessage = { message: '"email" must be a valid email' }

      expect(response.body).to.be.eqls(errorMessage);
    });
  });

  describe('Será validado que não é possível cadastrar com o campo "password" menor que 6 caracteres', () => {

    before(async () => {
      response = await chai.request(server).post('/user').send(usersMock.incorrectPasswordUserReqBody);
    })

    it('Deve responder com código de status "400"', () => {
      expect(response).to.have.status(400);
    });

    it('Deve retornar a mensagem de erro ""password" length must be at least 6 characters long" no corpo da response', () => {
      const errorMessage = { message: '"password" length must be at least 6 characters long' }

      expect(response.body).to.be.eqls(errorMessage);
    });
  });

  describe('Será validado que não é possível cadastrar com imagem inexistente', () => {

    before(async () => {
      response = await chai.request(server).post('/user').send(usersMock.incorrectImageUserReqBody);
    })

    it('Deve responder com código de status "400"', () => {
      expect(response).to.have.status(400);
    });

    it('Deve retornar a mensagem de erro ""image" is required" no corpo da response', () => {
      const errorMessage = { message: '"image" is required' }

      expect(response.body).to.be.eqls(errorMessage);
    });
  });

  describe('Será validado que não é possível cadastrar com um email já existente', () => {

    before(async () => {
      response = await chai.request(server).post('/user').send(usersMock.emailAlreadyExistingUserReqBody);
    })

    it('Deve responder com código de status "409"', () => {
      expect(response).to.have.status(409);
    });

    it('Deve retornar a mensagem de erro "User already registered" no corpo da response', () => {
      const errorMessage = { message: 'User already registered' }

      expect(response.body).to.be.eqls(errorMessage);
    });
  });

  describe('Será validado que é possível cadastrar um pessoa usuária com sucesso', () => {

    before(async () => {
      response = await chai.request(server).post('/user').send(usersMock.correctUserReqBody);
    })

    it('Deve responder com código de status "201"', () => {
      expect(response).to.have.status(201);
    });

    it('Deve responder com um token no corpo da response', () => {
      const { token } = response.body;

      const checkToken = validateToken(token);

      expect(checkToken).to.have.property('id');
      expect(checkToken).to.have.property('displayName');
      expect(checkToken).to.have.property('email');
      expect(checkToken).to.have.property('image');
      expect(checkToken).not.to.have.property('password');
    });
  });
});