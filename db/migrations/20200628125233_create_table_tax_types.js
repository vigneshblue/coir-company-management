
exports.up = function(knex) {
  return knex.schema.createTable('tax_types', table => {
    table.increments()
    table.string('name').notNullable().unique()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tax_types')
};
