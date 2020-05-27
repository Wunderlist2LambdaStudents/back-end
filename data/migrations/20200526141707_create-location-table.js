exports.up = function(knex) {
    return knex.schema.createTable('location', table => {
        table.integer('location_id').references('location').inTable('todo')
        table.float('latitude', 14, 10).notNullable();
        table.float('longitude', 14, 10).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('location')
};
