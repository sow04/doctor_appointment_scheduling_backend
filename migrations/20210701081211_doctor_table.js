
// exports.up = function (knex) {
//     return knex.schema.createTable('doctor_table', t => {
//         t.increments();
//         t.string('name').notNullable();
//         t.string('email').unique().notNullable();
//         t.string('password').notNullable();
//         t.string('cpassword').notNullable();
//         t.string('phone').notNullable();
//         t.string('address').notNullable();
//         t.string('expert_in')
//         t.string('degree')
//         t.dateTime('dob')
//         t.enu('status', ['active','Inactive']).notNullable();
//         t.timestamps();
//     });
// };

// exports.down = function (knex) {
//     return knex.schema.dropTable('doctor_table')
// };
