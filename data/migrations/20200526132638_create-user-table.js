exports.up = function(knex) {
    return knex.schema
    .createTable('user', table => {
        table.uuid('uuid').primary()
        table.string('username', 32).notNullable().unique().index()
        table.string('password').notNullable()
        table.string('token').notNullable()
    })
    .createTable('todo', table => {
        table.uuid('user_uuid').primary()
        table.string('title', 64).notNullable()
        table.string('body', 256).notNullable()
        table.date('due_date').notNullable()
        table.boolean('completed').notNullable()
        table.string('recurring', 16).notNullable()
        table.integer('location', 16).notNullable().unique()
    })
    .createTable('location', table => {
        table.integer('location_id').unsigned().notNullable()
        table.foreign('location_id').references('location').inTable('todo')
        table.float('latitude', 14, 10).notNullable()
        table.float('longitude', 14, 10).notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('location')
        .dropTableIfExists('todo')
        .dropTableIfExists('user')
};