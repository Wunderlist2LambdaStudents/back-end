exports.up = function(knex) {
    return knex.schema.createTable('todo', table => {
        table.uuid('user_uuid').primary()
        table.string('title', 64).notNullable()
        table.string('body', 256).notNullable()
        table.date('due_date').notNullable()
        table.boolean('completed').notNullable()
        table.string('recurring', 16).notNullable()
        table.integer('location', 16).notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('todo')
};
