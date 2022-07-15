const chai = require('chai');
const chaiHttp = require('chai-http');
const shell = require('shelljs');

const server = require('../../../src/api');
const sequelizeCommands = require('../../helpers/sequelizeCommands');
const usersMock = require('../../mocks/users');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota GET /user', () => {

  before(() => {
    shell.exec(sequelizeCommands.drop);
    shell.exec(sequelizeCommands.create);
    shell.exec(sequelizeCommands.migrate);
    shell.exec(sequelizeCommands.seed);
  });

  let response; 

  describe('Será validado que não é possível listar usuários sem o token na requisição', () => {

    before(async () => {
      response = await chai.request(server).get('/user');
    });

    it('Deve retornar código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('Deve retornar mensagem de erro no corpo da response', () => {
      expect(response.body).to.be.eqls({ message: 'Token not found' });
    });
  });

  describe('Será validado que não é possível listar usuários com o token inválido', () => {

    before(async() => {
      response = await chai.request(server).get('/user').set({ authorization: 'token_inválido' });
    });

    it('Deve retornar código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('Deve retornar mensagem de erro no corpo da response', () => {
      expect(response.body).to.be.eqls({ message: 'Expired or invalid token' });
    });
  });

  describe('Será validado que é possível listar todos os usuários', () => {

    before(async() => {
      const tokenResponse = await chai.request(server).post('/login').send(usersMock.correctBodyOfLoginRequest);

      response = await chai.request(server).get('/user').set({ authorization: tokenResponse.body.token });
    });

    it('Deve retornar código de status "200"', () => {
      expect(response).to.have.status(200);
    });

    it('Deve retornar uma lista com todos os usuários', () => {
      expect(response.body).to.be.eqls(usersMock.allUsers);
    });
  })
});