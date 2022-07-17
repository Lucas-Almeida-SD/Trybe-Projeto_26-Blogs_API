const chai = require('chai');
const chaiHttp = require('chai-http');
const shell = require('shelljs');
const server = require('../../../src/api');
const sequelizeCLI = require('../../helpers/sequelizeCLI');
const postsMock = require('../../mocks/posts');
const { correctBodyOfLoginRequest } = require('../../mocks/users');

chai.use(chaiHttp);
const { expect } = chai;

describe('Testes da rota "GET /post/search?q=:searchTerm"', () => {
  let response;

  before(() => {
    shell.exec(sequelizeCLI.drop);
    shell.exec(sequelizeCLI.create);
    shell.exec(sequelizeCLI.migrate);
    shell.exec(sequelizeCLI.seed);
  });

  describe('Será validado que não é possível buscar um blogpost sem o token', () => {

    before(async () => {
      response = await chai.request(server).get('/post/search');
    });

    it('Deve responder com código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('Deve retornar a mensagem de erro "Token not found" no corpo da response', () => {
      const errorMessage = { message: 'Token not found' };

      expect(response.body).to.be.eqls(errorMessage);
    });
  });

  describe('Será validado que não é possível buscar um blogpost com o token inválido', () => {

    before(async () => {
      response = await chai
        .request(server)
        .get('/post/search')
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

  describe('Será validado que é possível buscar todos os blogpost quando passa a busca vazia', () => {

    before(async () => {
      const loginRespose = await chai
        .request(server)
        .post('/login')
        .send(correctBodyOfLoginRequest);

      response = await chai
        .request(server)
        .get('/post/search')
        .set({ authorization: loginRespose.body.token })
        .query({ q: '' });
    });

    it('Deve responder com código de status "200"', () => {
      expect(response).to.have.status(200);
    });

    it('Deve retornar uma lista com todos os posts', () => {
      expect(response.body).to.be.eqls(postsMock.allPosts);
    });
  });

  describe('Será validado que é possível buscar um blogpost inexistente e retornar array vazio', () => {

    before(async () => {
      const loginRespose = await chai
        .request(server)
        .post('/login')
        .send(correctBodyOfLoginRequest);

      response = await chai
        .request(server)
        .get('/post/search')
        .set({ authorization: loginRespose.body.token })
        .query({ q: 'não existe' });
    });

    it('Deve responder com código de status "200"', () => {
      expect(response).to.have.status(200);
    });

    it('Deve retornar uma lista vazia', () => {
      expect(response.body).to.be.eqls([]);
    });
  });

  describe('Será validado que é possível buscar um blogpost pelo "title"', () => {

    before(async () => {
      const loginRespose = await chai
        .request(server)
        .post('/login')
        .send(correctBodyOfLoginRequest);

      response = await chai
        .request(server)
        .get('/post/search')
        .set({ authorization: loginRespose.body.token })
        .query({ q: 'post do' });
    });

    it('Deve responder com código de status "200"', () => {
      expect(response).to.have.status(200);
    });

    it('Deve retornar uma lista com todos os blogpost correspondentes', () => {
      expect(response.body).to.be.eqls([postsMock.allPosts[0]]);
    });
  });

  describe('Será validado que é possível buscar um blogpost pelo "content"', () => {

    before(async () => {
      const loginRespose = await chai
        .request(server)
        .post('/login')
        .send(correctBodyOfLoginRequest);

      response = await chai
        .request(server)
        .get('/post/search')
        .set({ authorization: loginRespose.body.token })
        .query({ q: 'não tem ré' });
    });

    it('Deve responder com código de status "200"', () => {
      expect(response).to.have.status(200);
    });

    it('Deve retornar uma lista com todos os blogpost correspondentes', () => {
      expect(response.body).to.be.eqls([postsMock.allPosts[1]]);
    });
  });
})