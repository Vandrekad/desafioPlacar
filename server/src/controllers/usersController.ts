import { Request, Response } from 'express';
import Knex from '../database/connection';

class UsersController {

    //Método para criar um usuário
    async create(request: Request, response: Response) {
        try {
            const {
                name,
                password
            } = request.body;

            const user = {
                name,
                password
            }

            //Verifica se o usuário já existe.
            const id = await Knex('users').where('name', name).first();
            if (!id) {

                const insertedUsers = await Knex('users').insert(user);

                const user_id = insertedUsers[0];

                return response.json({
                    user_id,
                    ...user,
                    message: 'Usuário criado com sucesso'
                })
            } else {
                return response.json({
                    message: 'O usuário já existe',
                })
            }
        } catch (error) {
            return response.json({
                error: true,
                message: error.message
            })
        }
    }

    //Método para realizar a autenticação de um usuário
    async login(request: Request, response: Response) {
        const {
            name,
            password
        } = request.body;


        try {
            const has = await Knex('users').where({
                name,
                password
            }).first();
            return response.json({
                id: has.id,
                succes: true
            });
        } catch (error) {
            response.json({ succes: false });
        }
    }
}

export default UsersController;