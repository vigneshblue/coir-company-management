
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('super_users').del()
    .then(function () {
      // Inserts seed entries
      return knex('super_users').insert([
        {id: 1, username: 'super_admin', password: 'password', role: 'super_admin'},
        {id: 2, username: 'admin', password: 'password', role: 'admin'}
      ]);
    });
};
