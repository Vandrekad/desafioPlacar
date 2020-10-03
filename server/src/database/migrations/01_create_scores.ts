import Knex from 'knex';

export async function up(knex: Knex) {
    //Criar Tabela
    return knex.schema.createTable('scores', table => {
        table.increments('id').primary();
        table.integer('score').notNullable();
        table.integer('id_user')
            .notNullable()
            .references('id')
            .inTable('users');
    });
}

export async function down(knex: Knex) {
    //Deletar Tabela
    return knex.schema.dropTable('scores');
}