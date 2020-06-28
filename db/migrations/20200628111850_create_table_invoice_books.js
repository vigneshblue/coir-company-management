
exports.up = function(knex) {
  return knex.schema.createTable('invoice_books', table => {
    table.increments()
    table.string('name').notNullable().unique()
    table.string('type').notNullable()
    table.text('description')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('invoice_books');
};
