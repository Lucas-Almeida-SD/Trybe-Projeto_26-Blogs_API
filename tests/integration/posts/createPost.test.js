const chai = require('chai');
const chaiHttp = require('chai-http');
const shell = require('shelljs');
const server = require('../../../src/api');
const sequelizeCLI = require('../../helpers/sequelizeCLI');
const postsMock = require('../../mocks/posts');
const { correctBodyOfLoginRequest } = require('../../mocks/users');

chai.use(chaiHttp);
const { expect } = chai;

describe('Testes da rota "POST /post"', () => {
  let response;

  before(() => {
    shell.exec(sequelizeCLI.drop);
    shell.exec(sequelizeCLI.create);
    shell.exec(sequelizeCLI.migrate);
    shell.exec(sequelizeCLI.seed);
  });

  describe('Será validado que não é possível cadastrar um blogpost sem o token', () => {

    before(async () => {
      response = await chai.request(server).post('/post');
    });

    it('Deve responder com código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('Deve retornar a mensagem de erro "Token not found" no corpo da response', () => {
      const errorMessage = { message: 'Token not found' };

      expect(response.body).to.be.eqls(errorMessage);
    });
  });

  describe('Será validado que não é possível cadastrar um blogpost com o token inválido', () => {

    before(async () => {
      response = await chai
        .request(server)
        .post('/post')
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

  describe('Será validado que não é possível cadastrar um blogpost sem todos os campos preenchidos', () => {

    before(async () => {
      const loginRespose = await chai
        .request(server)
        .post('/login')
        .send(correctBodyOfLoginRequest);

      response = await chai
        .request(server)
        .post('/post')
        .set({ authorization: loginRespose.body.token });
    });

    it('Deve responder com código de status "400"', () => {
      expect(response).to.have.status(400);
    });

    it('Deve retornar a mensagem de erro "Some required fields are missing" no corpo da response', () => {
      const errorMessage = { message: 'Some required fields are missing' };

      expect(response.body).to.be.eqls(errorMessage);
    });
  });

  describe('Será validado que não é possível cadastrar um blogpost com uma categoria inexistente', () => {

    before(async () => {
      const loginRespose = await chai
        .request(server)
        .post('/login')
        .send(correctBodyOfLoginRequest);

      response = await chai
        .request(server)
        .post('/post')
        .set({ authorization: loginRespose.body.token })
        .send(postsMock.nonExistentCategoryPostReqBody);
    });

    it('Deve responder com código de status "400"', () => {
      expect(response).to.have.status(400);
    });

    it('Deve retornar a mensagem de erro ""categoryIds" not found" no corpo da response', () => {
      const errorMessage = { message: '"categoryIds" not found' };

      expect(response.body).to.be.eqls(errorMessage);
    });
  });

  describe('Será validado que é possível cadastrar um blogpost com sucesso', () => {

    before(async () => {
      const loginRespose = await chai
        .request(server)
        .post('/login')
        .send(correctBodyOfLoginRequest);

      response = await chai
        .request(server)
        .post('/post')
        .set({ authorization: loginRespose.body.token })
        .send(postsMock.correctPostReqBody);
    });

    it('Deve responder com código de status "201"', () => {
      expect(response).to.have.status(201);
    });

    it('Deve retornar no corpo da response o post criado', () => {
      expect(response.body).to.have.property('id', 3);
      expect(response.body).to.have.property('title', postsMock.correctPostReqBody.title);
      expect(response.body).to.have.property('content', postsMock.correctPostReqBody.content);
      expect(response.body).to.have.property('userId', 1);
      expect(response.body).to.have.property('published');
      expect(response.body).to.have.property('updated');
    });
  });
});