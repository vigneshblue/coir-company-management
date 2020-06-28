
exports.up = function(knex) {
  return knex.schema.createTable('invoice_contents', table => {
    table.increments()
    table.string('type').notNullable()
    table.integer('product_id')
    table.foreign('product_id').references('products.id')
    table.string('batch_no')
    table.float('quantity').notNullable()
    table.string('unit')
    table.float('unit_price')
    table.float('discount_percentage')
    table.float('discount_amount')
    table.integer('tax_type_id')
    table.foreign('tax_type_id').references('tax_types.id')
    table.float('tax_amount')
    table.float('amount')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('invoice_contents', table => {
    table.dropForeign('product_id')
    table.dropForeign('tax_type_id')
  });
};
