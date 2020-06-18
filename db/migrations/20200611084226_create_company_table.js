
exports.up = function(knex) {
  return knex.schema.createTable('companies', table => {
    table.increments()
    table.string('name').notNullable().unique()
    table.string('address')
    table.string('phone')
    table.string('state')
    table.string('gst_no')
    table.string('bank_name')
    table.string('bank_account_no')
    table.string('bank_branch_name')
    table.string('bank_ifsc_code')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('companies');
};
