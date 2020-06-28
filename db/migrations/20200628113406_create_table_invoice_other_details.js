
exports.up = function(knex) {
  return knex.schema.createTable('invoice_other_details', table => {
    table.increments()
    table.string('driver_name')
    table.string('vehicle_no')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  });
};


exports.down = function(knex) {
  return knex.schema.dropTable('invoice_other_details')
};
