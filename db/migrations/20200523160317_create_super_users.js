
exports.up = function(knex) {
  return knex.schema.createTable('super_users', function(table) {
    table.increments();
    table.string('username').notNullable().unique();
    table.string('password').notNullable();
    table.string('role').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('super_users');
};
