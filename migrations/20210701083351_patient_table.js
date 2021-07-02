
// exports.up = function (knex) {
//     return knex.schema.createTable('patient_table', t => {
//         t.increments();
//         t.string('first_name').notNullable();
//         t.string('last_name').notNullable();
//         t.string('email').unique().notNullable();
//         t.string('password').notNullable();
//         t.string('phone').notNullable();
//         t.string('address').notNullable();
//         t.dateTime('date_of_birth').notNullable();
//         t.enu('gender', ['Male','Female','Other']).notNullable();
//         t.timestamps();
//     });
// };

// exports.down = function (knex) {
//     return knex.schema.dropTable('patient_table')
// };
