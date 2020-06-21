
exports.up = function(knex) {
  return knex.schema.createTable('products', table => {
    table.increments()
    table.string('name').notNullable().unique()
    table.string('code').unique()
    table.float('quantity').defaultTo(0);
    table.float('purchase_price')
    table.float('sales_price')
    table.float('minimum_quantity').defaultTo(0);
    table.string('location')
    table.text('others')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('products');
};
