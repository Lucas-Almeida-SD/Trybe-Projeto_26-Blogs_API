const chai = require('chai');
const chaiHttp = require('chai-http');
const shell = require('shelljs');
const sequelizeCLI = require('../../helpers/sequelizeCLI');
const server = require('../../../src/api');
const postsMock = require('../../mocks/posts');
const { correctBodyOfLoginRequest } = require('../../mocks/users');

chai.use(chaiHttp);
const { expect } = chai;

describe.only('Testes da rota "GET /post/:id"', () => {
  let response;

  before(() => {
    shell.exec(sequelizeCLI.drop);
    shell.exec(sequelizeCLI.create);
    shell.exec(sequelizeCLI.migrate);
    shell.exec(sequelizeCLI.seed);
  });

  describe('Será validado que não é possível listar um blogpost sem token', () => {

    before(async () => {
      response = await chai.request(server).get('/post/1');
    });

    it('Deve responder com código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('Deve retornar a mensagem de erro "Token not found" no corpo da response', () => {
      const errorMessage = { message: 'Token not found' };

      expect(response.body).to.be.eqls(errorMessage);
    });
  });

  describe('Será validado que não é possível listar blogpost com o token inválido', () => {

    before(async () => {
      response = await chai
        .request(server)
        .get('/post/1')
        .set(postsMock.invalidToken);
    });

    it('Deve responder com código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('Deve retornar a mensagem de erro "Expired or invalid token" no corpo da response', () => {
      const errorMessage = { message: 'Expired or invalid token' };

      expect(response.body).to.be.eqls(errorMessage);
    });
  });

  describe('Será validado que não é possível listar um blogpost inexistente', () => {

    before(async () => {
      const loginRespose = await chai
        .request(server)
        .post('/login')
        .send(correctBodyOfLoginRequest);

      response = await chai
        .request(server)
        .get('/post/9999')
        .set({ authorization: loginRespose.body.token });
    });

    it('Deve responder com código de status "404"', () => {
      expect(response).to.have.status(404);
    });

    it('Deve retornar a mensagem de erro "Post does not exist" no corpo da response', () => {
      const errorMessage = { message: 'Post does not exist' };

      expect(response.body).to.be.eqls(errorMessage);
    });
  });

  describe('Será validado que é possível listar um blogpost com sucesso', () => {

    before(async () => {
      const loginRespose = await chai
        .request(server)
        .post('/login')
        .send(correctBodyOfLoginRequest);

      response = await chai
        .request(server)
        .get('/post/1')
        .set({ authorization: loginRespose.body.token });
    });

    it('Deve responder com código de status "200"', () => {
      expect(response).to.have.status(200);
    });

    it('Deve retornar um post específico no corpo da response', () => {
      expect(response.body).to.be.eqls(postsMock.allPosts[0]);
    });
  });
});