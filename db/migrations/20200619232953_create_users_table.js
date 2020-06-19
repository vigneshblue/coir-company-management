
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments()
    table.string('name').notNullable().unique()
    table.string('type').notNullable()
    table.string('address')
    table.string('phone')
    table.string('state')
    table.integer('company_id')
    table.foreign('company_id').references('companies.id')
    table.string('bank_name')
    table.string('bank_account_no')
    table.string('bank_branch_name')
    table.string('bank_ifsc_code')
    table.float('opening_balance').defaultTo(0)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users', table => {
    table.dropForeign('company_id')
  });
};
