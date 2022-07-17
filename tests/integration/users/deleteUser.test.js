const chai = require('chai');
const chaiHttp = require('chai-http');
const shell = require('shelljs');
const sequelizeCLI = require('../../helpers/sequelizeCLI');
const server = require('../../../src/api');
const usersMock = require('../../mocks/users');

chai.use(chaiHttp);
const { expect } = chai;

describe('Testes da rota "DELETE /user/me"', () => {
  let response;
  let getUsersResponse;

  before(() => {
    shell.exec(sequelizeCLI.drop);
    shell.exec(sequelizeCLI.create);
    shell.exec(sequelizeCLI.migrate);
    shell.exec(sequelizeCLI.seed);
  });

  describe('Será validado que não é possível deletar meu usuário sem token', () => {

    before(async () => {
      response = await chai.request(server).delete('/user/me');
    });

    it('Deve responder com código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('Deve retornar a mensagem de erro "Token not found" no corpo da response', () => {
      const errorMessage = { message: 'Token not found' };

      expect(response.body).to.be.eqls(errorMessage);
    });
  });

  describe('Será validado que não é possível deletar meu usuário com o token inválido', () => {

    before(async () => {
      response = await chai
        .request(server)
        .delete('/user/me')
        .set(usersMock.invalidToken);
    });

    it('Deve responder com código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('Deve retornar a mensagem de erro "Expired or invalid token" no corpo da response', () => {
      const errorMessage = { message: 'Expired or invalid token' };

      expect(response.body).to.be.eqls(errorMessage);
    });
  });

  describe('Será validado que é possível excluir meu usuário com sucesso', () => {

    before(async () => {
      const loginRespose = await chai
        .request(server)
        .post('/login')
        .send(usersMock.correctBodyOfLoginRequest);

      response = await chai
        .request(server)
        .delete('/user/me')
        .set({ authorization: loginRespose.body.token })
        .send(usersMock.updatePostReqBody);

      getUsersResponse = await chai
        .request(server)
        .get('/user')
        .set({ authorization: loginRespose.body.token });
    });

    it('Deve responder com código de status "204"', () => {
      expect(response).to.have.status(204);
    });

    it('Ao listar usuários, deve possuir apenas um elemento na lista', () => {
      expect(getUsersResponse.body).to.have.length(1);
    });

    it('O banco de dados não deve possuir o usuário deletado', () => {
      expect(getUsersResponse.body).not.to.include(usersMock.allUsers[0]);
    });
  });
});