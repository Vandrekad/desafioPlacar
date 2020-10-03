import express from 'express';

import ScoresController from './controllers/scoresController';
import UsersController from './controllers/usersController';

const routes = express.Router();
const scoresController = new ScoresController();
const usersController = new UsersController();

//rotas
routes.get('/games', (request, response) => {
    return response.json([10, 20, 30, 40, 50]);
});

routes.get('/login', usersController.login);
routes.post('/users', usersController.create);

routes.get('/scores', scoresController.index);
routes.get('/scores/:id', scoresController.show);
routes.post('/scores', scoresController.create);

export default routes;