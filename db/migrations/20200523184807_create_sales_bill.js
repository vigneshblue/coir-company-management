
exports.up = function(knex) {
  return knex.schema.createTable('sales_bill', function(table) {
    table.increments();
    table.string('item_name');
    table.integer('batch_no');
    table.integer('unit');
    table.float('rate');
    table.float('quantity');
    table.float('amount');
    table.float('taxation');
    table.float('igst_amount');
    table.float('tax_amount');
    table.float('total_amount');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('sales_bill');
};
