import type { Knex } from "knex";

export async function up(knex: Knex){
    return knex.schema.createTable('link', (table) => {
        table.string('key').primary().notNullable();
        table.string('value').unique().notNullable();
        table.integer('counter').notNullable().defaultTo(0);
        table.timestamp('last_access');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex){
    return knex.schema.dropTableIfExists('link')
}

