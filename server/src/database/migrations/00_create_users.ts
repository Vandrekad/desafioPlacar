import Knex from 'knex';

export async function up(knex: Knex) {
    //Criar Tabela
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('password').notNullable();
    });
}

export async function down(knex: Knex) {
    //Deletar Tabela
    return knex.schema.dropTable('users');
}