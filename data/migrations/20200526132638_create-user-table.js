exports.up = function(knex) {
    return knex.schema
    .createTable('user', table => {
        table.uuid('uuid').primary()
        table.string('username', 32).notNullable().unique().index()
        table.string('password').notNullable()
        table.string('token').notNullable()
    })
    .createTable('todo', table => {
        table.string('user_uuid').notNullable()
        table.string('title').notNullable()
        table.string('body').notNullable()
        table.date('due_date').notNullable()
        table.boolean('completed').notNullable()
        table.string('recurring').notNullable()
        table.increments('location').unique()
    })
    .createTable('location', table => {
        table.integer('location_id').unsigned()
        table.foreign('location_id').references('location').inTable('todo')
        table.float('latitude', 14, 10)
        table.float('longitude', 14, 10)
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('location')
        .dropTableIfExists('todo')
        .dropTableIfExists('user')
};