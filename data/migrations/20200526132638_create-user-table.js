exports.up = function(knex) {
    return knex.schema.createTable('user', table => {
        table.uuid('uuid').primary()
        table.string('username', 32).notNullable().unique().index()
        table.string('password', 128).notNullable()
        table.string('token', 128).notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user')
};