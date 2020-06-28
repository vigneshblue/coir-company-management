
exports.up = function(knex) {
  return knex.schema.createTable('banks', table => {
    table.increments()
    table.string('account_name').notNullable()
    table.string('bank_name').notNullable()
    table.string('account_no').notNullable()
    table.float('opening_balance').notNullable().defaultTo(0)
    table.string('ifsc_code')
    table.string('branch_name')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('banks')
};
