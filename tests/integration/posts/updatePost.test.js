const chai = require('chai');
const chaiHttp = require('chai-http');
const shell = require('shelljs');
const sequelizeCLI = require('../../helpers/sequelizeCLI');
const server = require('../../../src/api');
const postsMock = require('../../mocks/posts');
const { 
  correctBodyOfLoginRequest, 
  userNotAuthorizedToUpdatePostLoginRequest
} = require('../../mocks/users');

chai.use(chaiHttp);
const { expect } = chai;

describe('Testes da rota "PUT /post/:id"', () => {
  let response;

  before(() => {
    shell.exec(sequelizeCLI.drop);
    shell.exec(sequelizeCLI.create);
    shell.exec(sequelizeCLI.migrate);
    shell.exec(sequelizeCLI.seed);
  });

  describe('Será validado que não é possível editar um blogpost sem token', () => {

    before(async () => {
      response = await chai.request(server).put('/post/1');
    });

    it('Deve responder com código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('Deve retornar a mensagem de erro "Token not found" no corpo da response', () => {
      const errorMessage = { message: 'Token not found' };

      expect(response.body).to.be.eqls(errorMessage);
    });
  });

  describe('Será validado que não é possível editar um blogpost com o token inválido', () => {

    before(async () => {
      response = await chai
        .request(server)
        .put('/post/1')
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

  describe('Será validado que não possível editar um blogpost sem todos os campos preenchidos', () => {

    before(async () => {
      const loginRespose = await chai
        .request(server)
        .post('/login')
        .send(correctBodyOfLoginRequest);

      response = await chai
        .request(server)
        .put('/post/1')
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

  describe('Será validado que não é possível editar um blogpost com outro usuário', () => {

    before(async () => {
      const loginRespose = await chai
        .request(server)
        .post('/login')
        .send(userNotAuthorizedToUpdatePostLoginRequest);

      response = await chai
        .request(server)
        .put('/post/1')
        .set({ authorization: loginRespose.body.token })
        .send(postsMock.updatePostReqBody);
    });

    it('Deve responder com código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('Deve retornar a mensagem de erro "Unauthorized user" no corpo da response', () => {
      const errorMessage = { message: 'Unauthorized user' };

      expect(response.body).to.be.eqls(errorMessage);
    });
  });

  describe('Será validado que é possível editar um blogpost com sucesso', () => {

    before(async () => {
      const loginRespose = await chai
        .request(server)
        .post('/login')
        .send(correctBodyOfLoginRequest);

      response = await chai
        .request(server)
        .put('/post/1')
        .set({ authorization: loginRespose.body.token })
        .send(postsMock.updatePostReqBody);
    });

    it('Deve responder com código de status "200"', () => {
      expect(response).to.have.status(200);
    });

    it('Deve retornar o blogpost atualizado no corpo da response', () => {
      expect(response.body).to.be.eqls(postsMock.updatedPostResBody);
    });
  });
});