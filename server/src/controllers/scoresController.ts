import { Request, Response } from 'express';
import Knex from '../database/connection';

class ScoresController {

    //Método para inserir uma pontuação
    async create(request: Request, response: Response) {
        try {
            const { score } = request.body;
            const { id_user } = request.headers;
            if (typeof id_user === 'string') {
                const id = parseInt(id_user)
                const scoreInserted = {
                    score,
                    'id_user': id
                }

                await Knex('scores').insert(scoreInserted);
                return response.json(scoreInserted.score);
            }
        } catch (error) {
            return response.json({
                error: true,
                message: error.message
            })
        }
    }

    //Método para listar todas as pontuações
    async index(request: Request, response: Response) {
        try {
            const { id_user } = request.headers;
            if (typeof id_user === 'string') {
                const id = parseInt(id_user)
                console.log(id);
                const scoresData = await Knex('scores').where('id_user', id)
                const scoresList = scoresData.map(item => {
                    return item.score;
                })
                return response.json(scoresList);
            }
        } catch (error) {
            return response.json({
                error: true,
                message: error.message
            })
        }
    }

    // Método para listar um único ponto
    async show(request: Request, response: Response) {
        const { id } = request.params;
        const header = request.headers;
        if (typeof header.id_user === 'string') {
            const id_user = parseInt(header.id_user)
            const score = await Knex('scores').where({
                id,
                id_user
            }).first();
            return response.json(score.score);
        }
    }

}

export default ScoresController;